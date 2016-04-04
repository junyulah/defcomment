require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js');
    var runUnit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/runUnit').runUnit;
    runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js', 'map', [
[[v => ++v, [3, 4, 7]], [4, 5, 8]]
]);
runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js', 'high', [
[[3], [5], 15],
[[6], [7], 42]
]);
runUnit('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo2.js', 'error', [
[[2], 2],
[[-1], new Error('v is too little. v = -1')]
]);