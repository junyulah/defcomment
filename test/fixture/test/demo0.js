
    try {
        require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/test/fixture/ret/demo0.js');
        var runUnit = require('/Users/yuer/workspaceforme/my_services/thirdparty/node/defcomment/src/runUnit').runUnit;
        
    } catch(err) {
        console.log('[31m', '[error happened when run unit case]', '[0m');
        console.log(err.stack);
    }
    