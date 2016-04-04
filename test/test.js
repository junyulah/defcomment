var index = require('../src/index');

var generateTests = index.generateTests;

var fs = require('fs');

generateTests(__dirname + '/fixture/src/demo1.js', __dirname + '/fixture/ret/demo1.js', __dirname + '/fixture/test/demo1.js').then(() => {
    require(__dirname + '/fixture/test/demo1.js');
}).catch(err => console.log(err, err.stack));
