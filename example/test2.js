var quick = require('../ext/quick');

quick({
    srcDir: __dirname + '/fixture/src',
    distDir: __dirname + '/fixture/ret',
    testDir: __dirname + '/fixture/test'
});
