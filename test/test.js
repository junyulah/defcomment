var quickTest = require('../ext/quickTest');

var srcDir = __dirname + '/fixture/src';
var distDir = __dirname + '/fixture/ret';
var testDir = __dirname + '/fixture/test';

quickTest({
    srcDir,
    distDir,
    testDir
});
