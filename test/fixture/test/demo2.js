
    try {
        require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js');
        var runUnit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/runUnit').runUnit;
        (function() { try{
            var sample = [
[[v => ++v, [3, 4, 7]], [4, 5, 8]],
[[v => ++v, [1, 2, 3]], [2, 3, 4]]
];
            var id = '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js';
            var varName = 'map';
            var sampleString = "[\n[[v => ++v, [3, 4, 7]], [4, 5, 8]],\n[[v => ++v, [1, 2, 3]], [2, 3, 4]]\n]";
            runUnit(id, varName, sample);
        } catch(err) {
            console.log('[31m', '[error happened when test method ' + varName + ']', '[0m');
            console.log('[33m', 'test sample is:' + sampleString, '[0m');
            console.log(err.stack);
    } })();
(function() { try{
            var sample = [
[[3], [5], 15],
[[6], [7], 42]
];
            var id = '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js';
            var varName = 'high';
            var sampleString = "[\n[[3], [5], 15],\n[[6], [7], 42]\n]";
            runUnit(id, varName, sample);
        } catch(err) {
            console.log('[31m', '[error happened when test method ' + varName + ']', '[0m');
            console.log('[33m', 'test sample is:' + sampleString, '[0m');
            console.log(err.stack);
    } })();
(function() { try{
            var sample = [
[[2], 2],
[[-1], new Error('v is too little. v = -1')]
];
            var id = '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js';
            var varName = 'error';
            var sampleString = "[\n[[2], 2],\n[[-1], new Error('v is too little. v = -1')]\n]";
            runUnit(id, varName, sample);
        } catch(err) {
            console.log('[31m', '[error happened when test method ' + varName + ']', '[0m');
            console.log('[33m', 'test sample is:' + sampleString, '[0m');
            console.log(err.stack);
    } })();
    } catch(err) {
        console.log('[31m', '[error happened when run unit case]', '[0m');
        console.log(err.stack);
    }
    