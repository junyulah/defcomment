'use strict';

let parseComment = require('../../src/parseComment');
let assert = require('assert');

describe('parseComment', () => {
    it('base', () => {
        assert.deepEqual(parseComment('/**/'), [{
            content: '/**/',
            next: '',
            paraBlocks: [['']]
        }]);
    });

    it('base2', () => {
        assert.deepEqual(parseComment('/**/abc/**/'), [{
            content: '/**/',
            next: 'abc',
            paraBlocks: [['']]
        }, {
            content: '/**/',
            next: '',
            paraBlocks: [['']]
        }]);
    });

    it('base3', () => {
        assert.deepEqual(parseComment('/*#test*/'), [{
            content: '/*#test*/',
            next: '',
            paraBlocks: [
                ['#test']
            ]
        }]);
    });

    it('wipe *', () => {
        assert.deepEqual(parseComment('/*****#test*****/'), [{
            content: '/*****#test*****/',
            next: '',
            paraBlocks: [
                ['#test****']
            ]
        }]);
    });

    it('seperate by #', () => {
        assert.deepEqual(parseComment('/*#test1\n#test2*/'), [{
            content: '/*#test1\n#test2*/',
            next: '',
            paraBlocks: [
                ['#test1'],
                ['#test2']
            ]
        }]);
    });

    it('seperate by # with lines', () => {
        assert.deepEqual(parseComment('/**\n#test1\n*abc\n#test2\n*def\n*lkl\n*/'), [{
            content: '/**\n#test1\n*abc\n#test2\n*def\n*lkl\n*/',
            next: '',
            paraBlocks: [
                [''],
                ['#test1', 'abc'],
                ['#test2', 'def', 'lkl', '']
            ]
        }]);
    });

    it('mulitple blocks', () => {
        console.log(JSON.stringify(parseComment(`
/**
 * @readme-quick-run
 *
 * run buildreadme in your project root
 *
 * ## test tar=bash
 *
 * cd ../test/fixture/node/p0
 * ./node_modules/.bin/buildreadme
 */

 /**
  * @readme-quick-run
  *
  * write result to readme.md, just add -w option
  *
  * ## test tar=bash
  *
  * cd ../test/fixture/node/p0
  * ./node_modules/.bin/buildreadme -w
  */
            `), null, 4));
    });
});
