
    try {
        require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js');
        var runUnit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/runUnit').runUnit;
        runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js', 'add', [
[[2, 3], 5] ,
[[4, 6], 10],
[[8, 9], 17]
]);
runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js', 'con', [
[100]
]);
    } catch(err) {
        console.log('[36m', '[error happened when run unit case]', '[0m]');
        console.log(err);
    }
    