
    try {
        require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js');
        var runUnit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/runUnit').runUnit;
        try{
        runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js', 'add', [
[[2, 3], 5] ,
[[4, 6], 10],
[[8, 9], 17]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "add"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[[2, 3], 5] ,\n[[4, 6], 10],\n[[8, 9], 17]\n]", '[0m');
            console.log(err.stack);
    }
try{
        runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js', 'con', [
[100]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "con"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[100]\n]", '[0m');
            console.log(err.stack);
    }
try{
        runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js', 'max', [
[[3, 2], 4]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "max"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[[3, 2], 4]\n]", '[0m');
            console.log(err.stack);
    }
try{
        runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js', 'min', [
[[3, 2], 4]
[[3, 2], 4]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "min"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[[3, 2], 4]\n[[3, 2], 4]\n]", '[0m');
            console.log(err.stack);
    }
    } catch(err) {
        console.log('[31m', '[error happened when run unit case]', '[0m');
        console.log(err.stack);
    }
    