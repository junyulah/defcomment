'use strict';

let {
    runTests
} = require('../../src/testRunner');

let assert = require('assert');

let path = require('path');

describe('browser', () => {
    let tempFile = path.join(__dirname, 'fixture/tmp.js');
    let tempTestFile = path.join(__dirname, 'fixture/tmp_test.js');

    it('runInBrowser', () => {
        return runTests('/*##test\n[[[1,2],3]]\n*/\nlet add = (v1, v2) => v1 + v2;', tempFile, tempTestFile, {
            silent: true,
            env: 'browser'
        }).then(ret => {
            assert.deepEqual(ret.fail.length, 0);
            assert.deepEqual(ret.cases.length, 1);
        });
    });

    it('runInBrowser: tar=js', () => {
        return runTests('/*##test tar=js\nassert.equal(3, 4)\n*/', tempFile, tempTestFile, {
            silent: true,
            env: 'browser'
        }).then(ret => {
            assert.deepEqual(ret.fail.length, 1);
            assert.deepEqual(ret.cases.length, 1);
        });
    });

    it('runInBrowser: require', () => {
        return runTests('/*##test tar=js c_r=num\nassert.equal(3, num)\n*/module.exports=3', tempFile, tempTestFile, {
            silent: true,
            env: 'browser'
        }).then(ret => {
            assert.deepEqual(ret.fail.length, 1);
            assert.deepEqual(ret.cases.length, 1);
        });
    });

    it('runInBrowser: wait promise', () => {
        return runTests('/*##test tar=js c_r=num\nwait(new Promise((resolve) => {setTimeout(resolve, 1000)}))\n*/module.exports=3', tempFile, tempTestFile, {
            silent: true,
            env: 'browser'
        }).then(ret => {
            assert.deepEqual(ret.fail.length, 0);
            assert.deepEqual(ret.cases.length, 1);
        });
    });

    it('runInBrowser: wait promise, reject', () => {
        return runTests('/*##test tar=js c_r=num\nwait(new Promise((resolve) => {setTimeout(reject, 1000)}))\n*/module.exports=3', tempFile, tempTestFile, {
            silent: true,
            env: 'browser'
        }).then(ret => {
            assert.deepEqual(ret.fail.length, 1);
            assert.deepEqual(ret.cases.length, 1);
        });
    });
});
