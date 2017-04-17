'use strict';

let {
    runTests
} = require('../../src/testRunner');

let assert = require('assert');

let path = require('path');

describe('env: browser', () => {
    let tempFile = path.join(__dirname, 'fixture/tmp/tmp.js');
    let tempTestFile = path.join(__dirname, 'fixture/tmp/tmp_test.js');

    it('normal', () => {
        return runTests('/*##test tar=js env=browser\n1+1;\n*/', tempFile, tempTestFile, {
            silent: true
        }).then(ret => {
            assert.equal(ret.cases.length, 1);
            assert.equal(ret.fail.length, 0);
        });
    });

    it('fail', () => {
        return runTests('/*##test tar=js env=browser\nthrow new Error("123")\n*/', tempFile, tempTestFile, {
            silent: true
        }).then(ret => {
            assert.equal(ret.cases.length, 1);
            assert.equal(ret.fail.length, 1);
        });
    });

    it('require current', () => {
        return runTests(`/*##test tar=js r_c=num env=browser
            assert.equal(1 + 3, num);
            */\nmodule.exports = 4;`, tempFile,
            tempTestFile, {
                silent: false
            }).
        then(ret => {
            assert.deepEqual(ret.fail.length, 0);
            assert.deepEqual(ret.cases.length, 1);
        });
    });

    it('require current: fail', () => {
        return runTests(`/*##test tar=js r_c=num env=browser
            assert.equal(1 + 5, num);
            */\nmodule.exports = 4;`, tempFile,
            tempTestFile, {
                silent: false
            }).
        then(ret => {
            assert.deepEqual(ret.fail.length, 1);
            assert.deepEqual(ret.cases.length, 1);
        });
    });
});
