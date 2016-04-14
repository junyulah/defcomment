'use strict';
require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js');
let unit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];
cases.push(
    it('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js',
         'map',
         [
[[v => ++v, [3, 4, 7]], [4, 5, 8]],
[[v => ++v, [1, 2, 3]], [2, 3, 4]]
],
         "[\n[[v => ++v, [3, 4, 7]], [4, 5, 8]],\n[[v => ++v, [1, 2, 3]], [2, 3, 4]]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js',
         'high',
         [
[[3], [5], 15],
[[6], [7], 42]
],
         "[\n[[3], [5], 15],\n[[6], [7], 42]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js',
         'error',
         [
[[2], 2],
[[-1], new Error('v is too little. v = -1')]
],
         "[\n[[2], 2],\n[[-1], new Error('v is too little. v = -1')]\n]")
);
var testRets = runCases(cases, '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js');
if(typeof module === 'object') {
    module.exports = testRets;
}
