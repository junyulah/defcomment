'use strict';

let parseComment = require('../../parseComment');
let testParser = require('../../testParser');
let promisify = require('es6-promisify');
let fs = require('fs');
let browserJsEnvTest = require('browser-js-env');

let path = require('path');
let mkdirp = promisify(require('mkdirp'));
let {
    fork
} = require('child_process');
let {
    logError, logNormal, logHint, logPass
} = require('../../util');

let logs = {
    logError, logNormal, logHint, logPass
};

const NODE_PROCESS_FILE = path.resolve(__dirname, '../env/nodeProcess');

const DEFAULT_TEST_DIR = path.resolve(__dirname, '../../../test/fixture/__test_dir__');

let writeFile = promisify(fs.writeFile);

let flushFile = (filePath, str, encode) => {
    return mkdirp(path.dirname(filePath)).then(() => {
        return writeFile(filePath, str, encode);
    });
};

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

    return runTestsWithParsedCode(resultCode, testCode, dest, test, opts);
};

let runTestsWithParsedCode = (resultCode, testCode, dest, test, opts = {}) => {
    return Promise.all([
        flushFile(test, testCode, 'utf-8'),
        flushFile(dest, resultCode, 'utf-8')
    ]).then(() => {
        if (opts.env === 'browser') {
            return runTestInBrowser(test, opts);
        } else {
            return runTestInNodeProcess(test, opts);
        }
    });
};

let runTestInNodeProcess = (test, opts) => {
    let child = fork(NODE_PROCESS_FILE, [test], {
        cwd: __dirname,
        silent: opts.silent
    });

    let stdouts = [],
        stderrs = [];

    child.stdout && child.stdout.on('data', (chunk) => {
        stdouts.push(chunk.toString());
    });

    child.stderr && child.stderr.on('data', (chunk) => {
        stderrs.push(chunk.toString());
    });

    return new Promise((resolve, reject) => {
        child.on('message', ({
            type, data, errorStack
        }) => {
            if (type === 'error') {
                reject(new Error(errorStack));
            } else if (type === 'result') {
                data.stdouts = stdouts;
                data.stderrs = stderrs;
                resolve(data);
            } else if (type === 'log') {
                if (!opts.silent) {
                    logs[data[0]](data[1]);
                }
            }
        });

        child.on('error', reject);
    });
};

let runTestInBrowser = (test) => {
    return browserJsEnvTest(`module.exports=require("${test}")`, {
        testDir: DEFAULT_TEST_DIR,
        clean: true
    });
};

module.exports = {
    genTestComponents,
    runTests,
    runTestsWithParsedCode
};
