'use strict';

let parseComment = require('./parseComment');
let testParser = require('./testParser');
let promisfy = require('./promisify');
let fs = require('fs');

let writeFile = promisfy(fs.writeFile);
let readFile = promisfy(fs.readFile);

/**
 * @param src String
 *   source code file path
 * @param dest String
 *   destination code file path
 * @param test String
 *   test code file path
 */
let generateTests = (src, dest, test) => {
    return readFile(src, 'utf-8').then((code) => {
        // parse code
        let blocks = parseComment(code);
        // generate test code
        let {
            injectCode, testCode
        } = testParser(blocks, dest);

        let resultCode = code + '\n' + injectCode;

        return Promise.all([
            writeFile(test, testCode, 'utf-8'),
            writeFile(dest, resultCode, 'utf-8')
        ]);
    });
};

module.exports = {
    parseComment,
    testParser,
    generateTests
};
