'use strict';

let parseComment = require('../../src/parseComment');
let testParser = require('../../src/testParser');
let assert = require('assert');

describe('index', () => {
    it('base', () => {
        assert.deepEqual(testParser(parseComment('/*## test\n[[1, 2], 3]*/\n let a = () => {}')).tests, [{
            sample: '[[1, 2], 3]',
            testVar: 'a',
            testVariables: {
                test: '',
                tar: 'function'
            }
        }]);
    });

    it('end line', () => {
        assert.deepEqual(testParser(parseComment('/*## test\n[[1, 2], 3]\n<!--testEnd-->other things*/\n let a = () => {}')).tests, [{
            sample: '[[1, 2], 3]',
            testVar: 'a',
            testVariables: {
                test: '',
                tar: 'function'
            }
        }]);
    });

    it('missing variable name', (done) => {
        try {
            testParser(parseComment('/*## test\n[[1, 2], 3]*/\n() => {}')).tests;
        } catch (err) {
            assert.equal(err.toString().indexOf('could not find function name') !== -1, true);
            done();
        }
    });

    it('test title', () => {
        assert.deepEqual(testParser(parseComment('/*## test a=b c=d\n[[1, 2], 3]*/\n let a = () => {}')).tests, [{
            sample: '[[1, 2], 3]',
            testVar: 'a',
            testVariables: {
                test: '',
                a: 'b',
                c: 'd',
                tar: 'function'
            }
        }]);
    });

    it('test title2', () => {
        assert.deepEqual(testParser(parseComment('/*## testenv=bash\n[[1, 2], 3]*/\n let a = () => {}')).tests, []);
    });
});
