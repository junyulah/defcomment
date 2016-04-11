'use strict';

let util = require('./util');
let stringData = util.stringData;
let eq = require('./eq');
let log = console.log // eslint-disable-line

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
    log('\x1b[36m', `[test] ${id}:${testVar} --------`, '\x1b[0m');
    let func = __env_global['__test_probe__'][id][testVar];
    sample.map((testData) => {
        let expectedOuput = testData.pop();
        if (!testData.length) {
            testData.push([]);
        }
        let inputString = stringData(testData);
        let ret = getRet(func, testData);
        // equalilty
        eq(ret, expectedOuput);
        log('\x1b[33m', '[test] equal for input ' + inputString + ' and output ' + stringData(expectedOuput) + ' . The real output is ' + stringData(ret), '\x1b[0m');
    });
    log('');

    log('\x1b[36m', '[test] pass -----------------\n', '\x1b[0m');
};

let getRet = (func, testData) => {
    let ret = func;
    while (testData.length) {
        let input = testData.shift();
        try {
            ret = ret.apply(undefined, input);
        } catch (err) {
            return err;
        }
    }
    return ret;
};

module.exports = {
    runUnit,
    exportsVariable
};
