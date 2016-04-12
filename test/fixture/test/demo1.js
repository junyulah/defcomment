
    try {
        require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js');
        var runUnit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/runUnit').runUnit;
        (function() { try{
            var sample = [
[[2, 3], 5] ,
[[4, 6], 10],
[[8, 9], 17]
];
            var id = '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js';
            var varName = 'add';
            var sampleString = "[\n[[2, 3], 5] ,\n[[4, 6], 10],\n[[8, 9], 17]\n]";
            runUnit(id, varName, sample);
        } catch(err) {
            console.log('[31m', '[error happened when test method ' + varName + ']', '[0m');
            console.log('[33m', 'test sample is:' + sampleString, '[0m');
            console.log(err.stack);
    } })();
(function() { try{
            var sample = [
[[], 100]
];
            var id = '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js';
            var varName = 'con';
            var sampleString = "[\n[[], 100]\n]";
            runUnit(id, varName, sample);
        } catch(err) {
            console.log('[31m', '[error happened when test method ' + varName + ']', '[0m');
            console.log('[33m', 'test sample is:' + sampleString, '[0m');
            console.log(err.stack);
    } })();
(function() { try{
            var sample = [
[[3, 2], 4]
];
            var id = '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js';
            var varName = 'max';
            var sampleString = "[\n[[3, 2], 4]\n]";
            runUnit(id, varName, sample);
        } catch(err) {
            console.log('[31m', '[error happened when test method ' + varName + ']', '[0m');
            console.log('[33m', 'test sample is:' + sampleString, '[0m');
            console.log(err.stack);
    } })();
(function() { try{
            var sample = [
[[3, 2], 4]
[[3, 2], 4]
];
            var id = '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js';
            var varName = 'min';
            var sampleString = "[\n[[3, 2], 4]\n[[3, 2], 4]\n]";
            runUnit(id, varName, sample);
        } catch(err) {
            console.log('[31m', '[error happened when test method ' + varName + ']', '[0m');
            console.log('[33m', 'test sample is:' + sampleString, '[0m');
            console.log(err.stack);
    } })();
(function() { try{
            var sample = [
[[3, 2], [], 4],
[[3, 2], [], 4]
];
            var id = '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js';
            var varName = 'min2';
            var sampleString = "[\n[[3, 2], [], 4],\n[[3, 2], [], 4]\n]";
            runUnit(id, varName, sample);
        } catch(err) {
            console.log('[31m', '[error happened when test method ' + varName + ']', '[0m');
            console.log('[33m', 'test sample is:' + sampleString, '[0m');
            console.log(err.stack);
    } })();
(function() { try{
            var sample = [
[200]
];
            var id = '/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js';
            var varName = 'v';
            var sampleString = "[\n[200]\n]";
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
    