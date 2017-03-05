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

let runTests = (code, dest, test, opts) => {
    let {
        resultCode, testCode
    } = genTestComponents(code, dest, opts);

    return Promise.all([
        writeFile(test, testCode, 'utf-8'),
        writeFile(dest, resultCode, 'utf-8')
    ]).then(() => {
        let child = fork('testProcess.js', [test], {
            stdio: 'inherit',
            cwd: __dirname
        });

        return new Promise((resolve, reject) => {
            child.on('message', (e) => resolve(e));
            child.on('error', (err) => reject(err));
        });
    });
};

module.exports = {
    genTestComponents,
    runTests
};
