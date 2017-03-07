'use strict';

let parseComment = require('../parseComment');
let testParser = require('../testParser');
let promisfy = require('es6-promisify');
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

let writeFile = promisfy(fs.writeFile);
let readFile = promisfy(fs.readFile);
let mkdir = promisfy(fs.mkdir);

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
        writeFile(test, testCode, 'utf-8'),
        writeFile(dest, resultCode, 'utf-8')
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

let runDirTests = (pattern, {
    srcDir, destDir, testDir, opts = {}
}) => {
    let prepare = opts.clean ? del([destDir, testDir]).then(() => {
        return Promise.all([mkdir(destDir),
            mkdir(testDir)
        ]);
    }) : null;

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

let runDirTestsWithResult = (pattern, {
    srcDir, destDir, testDir, opts = {}
}) => {
    return runDirTests(pattern, {
        srcDir, destDir, testDir, opts
    }).then(rets => {
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
                logHint(`\n\r   ${index+1})${id.replace(destDir, srcDir)} : ${varName}`);

                logNormal(`     ${errorMsg}`);
                logNormal(sampleString);
            });
        }
        return rets;
    });
};

let watchDirTests = (pattern, {
    srcDir, destDir, testDir, opts = {}
}) => {
    let watcher = chokidar.watch(srcDir, {
        ignored: opts.ignored || /node_modules/
    });

    watcher.on('all', () => {
        runDirTestsWithResult(pattern, {
            srcDir, destDir, testDir, opts
        });
    });
};

module.exports = {
    genTestComponents,
    runTests,
    runDirTests,
    watchDirTests,
    runDirTestsWithResult
};
