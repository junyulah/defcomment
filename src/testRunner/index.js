'use strict';

let promisify = require('es6-promisify');
let fs = require('fs');
let del = require('del');
let glob = require('glob');
let path = require('path');
let chokidar = require('chokidar');

let {
    runTests, genTestComponents
} = require('./runTests');

let {
    logPass, logError, logHint, logNormal
} = require('../util');

let readFile = promisify(fs.readFile);
let mkdirp = promisify(require('mkdirp'));

const DEAFULT_PATTERN = '**/*';

let runDirTests = (pattern = DEAFULT_PATTERN, {
    srcDir, destDir, testDir, opts = {}
}) => {
    if (!srcDir) throw new Error('missing source directory');

    srcDir = path.resolve(srcDir);

    destDir = destDir || path.resolve(srcDir, '../__dest__');
    testDir = testDir || path.resolve(srcDir, '../__test__');

    destDir = path.resolve(destDir);
    testDir = path.resolve(testDir);

    let prepare = Promise.resolve(opts.clean ? del([destDir, testDir]) : null).then(() => {
        return Promise.all([
            mkdirp(destDir),
            mkdirp(testDir)
        ]);
    });

    return Promise.resolve(prepare).then(() => {
        return new Promise((resolve, reject) => {
            glob(pattern, {
                cwd: srcDir,
                nodir: true,
                ignore: 'node_modules/**/*'
            }, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Promise.all(
                        files.map((file) => {
                            let srcFilePath = path.join(srcDir, file);
                            let destFilePath = path.join(destDir, file);
                            let testFilePath = path.join(testDir, file);

                            return readFile(srcFilePath, 'utf-8').then((code) => {
                                return runTests(code, destFilePath, testFilePath, opts);
                            });
                        })
                    ));
                }
            });
        });
    });
};

let runDirTestsWithResult = (...args) => {
    return runDirTests(...args).then(rets => {
        let fails = rets.reduce((prev, ret) => {
            return prev.concat(ret.fail);
        }, []);

        let totalCount = rets.reduce((prev, ret) => {
            return prev + ret.cases.length;
        }, 0);

        let failCount = fails.length;

        logPass(`${totalCount - failCount} passing`);

        if (failCount) {
            logError(`${failCount} fail`);
            fails.forEach(({
                id, varName, errorMsg, sampleString
            }, index) => {
                logHint(`\n\r   ${index+1})${id} : ${varName}`);

                logNormal(`     ${errorMsg}`);
                logNormal(sampleString);
            });
        }
        return rets;
    });
};

let watchDirTests = (pattern, options) => {
    let watcher = chokidar.watch(options.srcDir, {
        ignored: options.opts.ignored || /node_modules/
    });

    watcher.on('all', () => {
        runDirTestsWithResult(pattern, options);
    });
};

module.exports = {
    genTestComponents,
    runTests,
    runDirTests,
    watchDirTests,
    runDirTestsWithResult
};
