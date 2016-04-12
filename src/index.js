'use strict';

let parseComment = require('./parseComment');
let testParser = require('./testParser');
let promisfy = require('./promisify');
let fs = require('fs');

let writeFile = promisfy(fs.writeFile);
let readFile = promisfy(fs.readFile);

let generateTests = (src, dist, test) => {
    return readFile(src, 'utf-8').then(code => {
        let blocks = parseComment(code);
        let ret = testParser(blocks, dist);
        let resultCode = code + '\n' + ret.injectCode;
        return Promise.all([writeFile(test, ret.testCode, 'utf-8'), writeFile(dist, resultCode, 'utf-8')]);
    });
};

module.exports = {
    parseComment,
    testParser,
    generateTests
};
