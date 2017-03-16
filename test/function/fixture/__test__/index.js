'use strict';
require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/__dest__/index.js'); // require source code

let unit = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/src/testParser/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/__dest__/index.js',
         'add',
         [
     [[1, 2], 3],
     [[1, 2], 4]
],
         "[\n     [[1, 2], 3],\n     [[1, 2], 4]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/__dest__/index.js',
         'minus',
         [
     [[1, 2], -1],
     [[2, 2], 0]
],
         "[\n     [[1, 2], -1],\n     [[2, 2], 0]\n]")
);

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/__dest__/index.js');

if(typeof module === 'object') {
    module.exports = testRets;
}
