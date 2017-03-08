'use strict';

let parseComment = require('../parseComment');
let testParser = require('../testParser');
let promisify = require('es6-promisify');
let fs = require('fs');
let del = require('del');
let {
    fork
} = require('child_process');
let glob = require('glob');
let path = require('path');
let chokidar = require('chokidar');

let {
    logPass, logError, logHint, logNormal
} = require('../util');

let writeFile = promisify(fs.writeFile);
let readFile = promisify(fs.readFile);
let mkdirp = promisify(require('mkdirp'));

let genTestComponents = (code, id, opts) => {
    // parse code
    let blocks = parseComment(code);
    // generate test code
    let {
        injectCode, testCode
    } = testParser(blocks, id, opts);

    let resultCode = code + '\n\n' + injectCode;

    return {
        resultCode,
        testCode
    };
};

/**
 * run tests from source code
 */
let runTests = (code, dest, test, opts = {}) => {
    let {
        resultCode, testCode
    } = genTestComponents(code, dest, opts);

    return Promise.all([
        flushFile(test, testCode, 'utf-8'),
        flushFile(dest, resultCode, 'utf-8')
    ]).then(() => {
        let child = fork('testProcess.js', [test], {
            cwd: __dirname,
            silent: opts.silent
        });

        return new Promise((resolve, reject) => {
            child.on('message', resolve);
            child.on('error', reject);
        });
    });
};

let flushFile = (filePath, str, encode) => {
    return mkdirp(path.dirname(filePath)).then(() => {
        return writeFile(filePath, str, encode);
    });
};

let runDirTests = (pattern = '**/*.js', {
    srcDir, destDir, testDir, opts = {}
}) => {
    if (!srcDir) throw new Error('missing source directory');

    destDir = destDir || path.resolve(srcDir, '../__dest__');
    testDir = testDir || path.resolve(srcDir, '../__test__');

    let prepare = Promise.resolve(opts.clean ? del([destDir, testDir]) : null).then(() => {
        return Promise.all([
            mkdirp(destDir),
            mkdirp(testDir)
        ]);
    });

    return Promise.resolve(prepare).then(() => {
        return new Promise((resolve, reject) => {
            glob(pattern, {
                cwd: srcDir
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
