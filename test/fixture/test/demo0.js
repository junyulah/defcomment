'use strict';
require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo0.js');
let unit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

var testRets = runCases(cases, '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo0.js');
if(typeof module === 'object') {
    module.exports = testRets;
}
