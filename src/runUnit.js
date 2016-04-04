'use strict'

let util = require('./util');
let stringData = util.stringData;
let eq = require('./eq');
let __env_global = null;
if (typeof window !== 'undefined') {
    __env_global = window;
} else {
    __env_global = global;
}

let exportsVariable = (id, name, testVar) => {
    __env_global['__test_probe__'] = __env_global['__test_probe__'] || {};
    let testProbe = __env_global['__test_probe__'];
    testProbe[id] = testProbe[id] || {};
    testProbe[id][name] = testVar;
};

let runUnit = (id, testVar, sample) => {
    console.log(`[test] ${id}:${testVar} --------`);
    var func = __env_global['__test_probe__'][id][testVar];
    sample.map((testData) => {
        var expectedOuput = testData.pop();
        var ret = func;
        if (!testData.length) {
            testData.push([]);
        }
        var inputString = stringData(testData);
        while (testData.length) {
            var input = testData.shift();
            ret = ret.apply(undefined, input);
        }
        eq(ret, expectedOuput);
        console.log('[test] equal for input ' + inputString + ' and output ' + stringData(expectedOuput) + ' . The real output is ' + stringData(ret));
    });
    console.log('[test] pass -----------------\n');
};

module.exports = {
    runUnit,
    exportsVariable
};
