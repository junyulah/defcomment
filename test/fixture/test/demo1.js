'use strict';
require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js');
let unit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];
cases.push(
    it('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js',
         'add',
         [
[[2, 3], 5] ,
[[4, 6], 10],
[[8, 9], 17]
],
         "[\n[[2, 3], 5] ,\n[[4, 6], 10],\n[[8, 9], 17]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js',
         'con',
         [
[[], 100]
],
         "[\n[[], 100]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js',
         'max',
         [
[[3, 2], 4]
],
         "[\n[[3, 2], 4]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js',
         'min',
         [
[[3, 2], 4]
[[3, 2], 4]
],
         "[\n[[3, 2], 4]\n[[3, 2], 4]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js',
         'min2',
         [
[[3, 2], [], 4],
[[3, 2], [], 4]
],
         "[\n[[3, 2], [], 4],\n[[3, 2], [], 4]\n]")
);

cases.push(
    it('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js',
         'v',
         [
[200]
],
         "[\n[200]\n]")
);
var testRets = runCases(cases, '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js');
if(typeof module === 'object') {
    module.exports = testRets;
}
