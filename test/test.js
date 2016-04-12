var index = require('../src/index');
var log = console.log; // eslint-disable-line

var generateTests = index.generateTests;

var srcDir = __dirname + '/fixture/src';
var distDir = __dirname + '/fixture/ret';
var testDir = __dirname + '/fixture/test';

var runUnit = (name) => {
    var src = srcDir + '/' + name;
    var dist = distDir + '/' + name;
    var test = testDir + '/' + name;
    return generateTests(src, dist, test).then(() => {
        require(test);
    }).catch(err => log(err, err.stack));
};

// test1
runUnit('demo1.js');

// test2
runUnit('demo2.js');
