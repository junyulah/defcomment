'use strict';

let {
    logError, logNormal, logHint, logPass
} = require('../util');

let eq = require('./eq');
let stringData = require('./stringData');

let __env_global = null;
if (typeof window !== 'undefined') {
    __env_global = window;
} else {
    __env_global = global;
}

module.exports = (id, testVariables, varName, sampleString, sample) => {
    try {
        runSampleMatrix(id, varName, sample);
    } catch (err) {
        logError('[error happened when test method ' + varName + ']');
        logHint('test sample is:' + sampleString);
        logNormal(err.stack);

        return {
            result: false,
            stack: err.stack,
            errorMsg: err.errorMsg || err.toString()
        };
    }
    return {
        result: true
    };
};

let runSampleMatrix = (id, testVar, sample) => {
    logPass(`[test] ${id}:${testVar} --------`);
    checkSample(sample);

    let func = __env_global['__test_probe__'][id][testVar];
    sample.map((testData) => {
        let expectedOuput = testData.pop();
        let inputString = stringData(testData);
        let ret = getRet(func, testData);
        // equalilty
        eq(ret, expectedOuput);
        logHint('[test] equal for input ' + inputString + ' and output ' + stringData(expectedOuput) + ' . The real output is ' + stringData(ret));
    });
    logNormal('');
};

let checkSample = (sample) => {
    if (!isArray(sample)) {
        logError('[error sample] sample must be arary');
        logHint('sample is ' + stringData(sample));
        throw new TypeError('test sample must be array');
    }
    if (sample.length <= 1) return true;
    for (let i = 0; i < sample.length - 1; i++) {
        let item = sample[i];
        if (!isArray(item)) {
            logError('[error sample] input data must be array');
            logHint('sample is ' + stringData(sample));
            throw new TypeError('test sample must be array');
        }
    }
};

let getRet = (func, testData) => {
    let ret = func;
    while (testData.length) {
        let input = testData.shift();
        if (typeof ret !== 'function') {
            logError('[error getRet] can not prosses inputdata, have more levels inputData.');
            logHint('inputData is ' + stringData(testData));
            throw new Error('Expect function for testData');
        }
        try {
            ret = ret.apply(undefined, input);
        } catch (err) {
            return err;
        }
    }
    return ret;
};

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';
