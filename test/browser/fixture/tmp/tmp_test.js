'use strict';
let cJs = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/browser/fixture/tmp/tmp.js'); // require source code
let unit = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
   it('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/browser/fixture/tmp/tmp.js', {"test":"","tar":"js","r_c":"num","env":"browser"},
        'null',
        "assert.equal(1 + 5, num);",
        null,
        cJs)
)

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/browser/fixture/tmp/tmp.js');

if(typeof module === 'object') {
    module.exports = testRets;
}