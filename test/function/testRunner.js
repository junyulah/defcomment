'use strict';

let {
    runTests, runDirTests, runDirTestsWithResult
} = require('../../src/testRunner');

let assert = require('assert');

let path = require('path');

describe('testRunner', () => {
    let tempFile = path.join(__dirname, 'fixture/tmp.js');
    let tempTestFile = path.join(__dirname, 'fixture/tmp_test.js');

    it('base', () => {
        return runTests('/*##test\n[[[1,2],3]]\n*/\nlet add = (v1, v2) => v1 + v2;', tempFile, tempTestFile, {
            silent: true
        }).then(ret => {
            assert.deepEqual(ret.fail.length, 0);
            assert.deepEqual(ret.cases.length, 1);
        });
    });

    it('fail', () => {
        return runTests('/*##test\n[[[1,2],4], [[2,3],5]]\n*/\nlet add = (v1, v2) => v1 + v2;', tempFile, tempTestFile, {
            silent: true
        }).then(ret => {
            assert.deepEqual(ret.fail.length, 1);
            assert.deepEqual(ret.cases.length, 1);
        });
    });

    it('runDirTests', () => {
        return runDirTests('**/*.js', {
            srcDir: path.join(__dirname, './fixture/glob'),
            opts: {
                silent: true,
                clean: true
            }
        }).then(ret => {
            assert.deepEqual(ret.length, 2);
            assert.deepEqual(ret[0].fail.length, 1);
            assert.deepEqual(ret[0].cases.length, 2);
        });
    });

    it('runDirTestsWithResult', () => {
        return runDirTestsWithResult('**/*.js', {
            srcDir: path.join(__dirname, './fixture/glob'),
            destDir: path.join(__dirname, './fixture/globDest'),
            testDir: path.join(__dirname, './fixture/globTest'),
            opts: {
                silent: false,
                clean: true
            }
        }).then(ret => {
            assert.deepEqual(ret.length, 2);
            assert.deepEqual(ret[0].fail.length, 1);
            assert.deepEqual(ret[0].cases.length, 2);
        });
    });

});
