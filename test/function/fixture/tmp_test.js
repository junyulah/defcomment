'use strict';
require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/tmp.js'); // require source code
let unit = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/tmp.js', {"test":"","tar":"function"},
         'add',
         "[[[1,2],4], [[2,3],5]]",
         [[[1,2],4], [[2,3],5]])
);

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/tmp.js');

if(typeof module === 'object') {
    module.exports = testRets;
}