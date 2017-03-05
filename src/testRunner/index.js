'use strict';

let parseComment = require('../parseComment');
let testParser = require('../testParser');
let promisfy = require('es6-promisify');
let fs = require('fs');
let {
    fork
} = require('child_process');

let writeFile = promisfy(fs.writeFile);

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

module.exports = {
    genTestComponents,
    runTests
};
