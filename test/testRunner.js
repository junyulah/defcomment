'use strict';

let {
    runTests
} = require('../src/testRunner');

let assert = require('assert');

let path = require('path');

describe('testRunner', () => {
    let tempFile = path.join(__dirname, 'fixture/tmp.js');
    let tempTestFile = path.join(__dirname, 'fixture/tmp_test.js');

    it('base', () => {
        return runTests('/*##test\n[[[1,2],3]]\n*/\nlet add = (v1, v2) => v1 + v2;', tempFile, tempTestFile).then(ret => {
            assert.deepEqual(ret.fail.length, 0);
            assert.deepEqual(ret.cases.length, 1);
        });
    });
});
