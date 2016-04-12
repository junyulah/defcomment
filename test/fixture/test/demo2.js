
    try {
        require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js');
        var runUnit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/runUnit').runUnit;
        try{
        runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js', 'map', [
[[v => ++v, [3, 4, 7]], [4, 5, 8]],
[[v => ++v, [1, 2, 3]], [2, 3, 4]]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "map"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[[v => ++v, [3, 4, 7]], [4, 5, 8]],\n[[v => ++v, [1, 2, 3]], [2, 3, 4]]\n]", '[0m');
            console.log(err.stack);
    }
try{
        runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js', 'high', [
[[3], [5], 15],
[[6], [7], 42]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "high"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[[3], [5], 15],\n[[6], [7], 42]\n]", '[0m');
            console.log(err.stack);
    }
try{
        runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js', 'error', [
[[2], 2],
[[-1], new Error('v is too little. v = -1')]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "error"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[[2], 2],\n[[-1], new Error('v is too little. v = -1')]\n]", '[0m');
            console.log(err.stack);
    }
    } catch(err) {
        console.log('[31m', '[error happened when run unit case]', '[0m');
        console.log(err.stack);
    }
    