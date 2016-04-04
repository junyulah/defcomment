
            require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js');
            var eq = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/eq');
            
        var __env_global = null;
        if(typeof window !== 'undefined') {
            __env_global = window;
        } else {
            __env_global = global;
        }
        (function () { 
            console.log('[test] /Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js:add --------');
            var testDataMatrix = [
[[2, 3], 5] ,
[[4, 6], 10],
[[8, 9], 17]
];
            var func = __env_global['__test_probe__']['/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo1.js']['add']
            testDataMatrix.map((testData) => {
                var input = testData[0];
                var expectedOuput = testData[1];
                var ret = func.apply(undefined, input);
                eq(ret, expectedOuput);
                console.log('[test] equal for input ' + input + ' and output ' + expectedOuput + ' . The real output is ' + ret);
            });

            console.log('[test] pass -----------------');
        })();
        