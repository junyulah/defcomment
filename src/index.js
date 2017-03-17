'use strict';

let parseComment = require('./parseComment');
let testParser = require('./testParser');

let {
    genTestComponents,
    runTests,
    runTestsWithParsedCode,
    runDirTests,
    watchDirTests,
    runDirTestsWithResult
} = require('./testRunner');

module.exports = {
    parseComment,
    testParser,
    runTests,
    genTestComponents,
    runDirTests,
    watchDirTests,
    runDirTestsWithResult,
    runTestsWithParsedCode
};
