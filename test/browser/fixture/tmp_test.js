'use strict';
let requiredCurrentJs = null;
let unit = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
   it('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/browser/fixture/tmp.js', {"test":"","tar":"js","c_r":"num"},
        'null',
        "return new Promise((resolve, reject) => {setTimeout(reject, 500)})",
        null,
        requiredCurrentJs)
)

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/browser/fixture/tmp.js');

if(typeof module === 'object') {
    module.exports = testRets;
}