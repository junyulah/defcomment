'use strict';
require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/__dest__/nest/index.js'); // require source code

let unit = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/src/testParser/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/__dest__/nest/index.js',
         'multiply',
         [
    [[3, 5], 15]
],
         "[\n    [[3, 5], 15]\n]")
);

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/__dest__/nest/index.js');

if(typeof module === 'object') {
    module.exports = testRets;
}
