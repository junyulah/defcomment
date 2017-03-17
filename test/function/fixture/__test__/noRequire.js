'use strict';

let unit = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/src/testParser/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

cases.push(
    it('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/__dest__/noRequire.js', {"test":"","tar":"bash"},
         'null',
         "echo 123")
);

var testRets = runCases(cases, '/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/function/fixture/__dest__/noRequire.js');

if(typeof module === 'object') {
    module.exports = testRets;
}