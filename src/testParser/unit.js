'use strict';

let {
    logError, logNormal, logPass, logHint
} = require('../util');

let stringData = require('./stringData');
let path = require('path');

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

let runCases = (cases, id) => {
    return cases.reduce((prevp, c) => {
        return prevp.then(([pass, fail]) => {
            return Promise.resolve(c.fun()).then((ret) => {
                if (!ret.result) {
                    c.stack = ret.stack;
                    c.errorMsg = ret.errorMsg;
                    fail.push(c);
                } else {
                    c.result = ret;
                    pass.push(c);
                }
                return [pass, fail];
            });
        });
    }, Promise.resolve([
        [],
        []
    ])).then(([pass, fail]) => {
        return {
            cases,
            fail,
            pass,
            id
        };
    });
};

/**
 * used to collect test cases
 */
let it = (id, testVariables, varName, sampleString, sample) => {
    let fun = null;
    if (testVariables.tar === 'bash') {
        fun = () => runBash(id, sampleString);
    } else {
        fun = () => runMatrixTestData(id, varName, sample, sampleString);
    }

    return {
        fun,
        varName,
        id,
        sample,
        sampleString,
        testVariables
    };
};

let runBash = (id, sampleString) => {
    let {
        exec
    } = eval('require')('child_process');

    return new Promise((resolve) => {
        let child = exec(sampleString, {
            cwd: path.dirname(id)
        }, (err, stdouts, stderrs) => {
            if (err) {
                resolve({
                    result: false,
                    stack: err.stack,
                    errorMsg: err.errorMsg || err.toString()
                });
            } else {
                resolve({
                    result: true,
                    stdouts,
                    stderrs
                });
            }
        });
        child.stdout.on('data', (stdout) => {
            console.log(stdout); // eslint-disable-line
        });
        child.stderr.on('data', (stderr) => {
            console.log(stderr); // eslint-disable-line
        });
    });
};

let runMatrixTestData = (id, varName, sample, sampleString) => {
    try {
        run(id, varName, sample);
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

let run = (id, testVar, sample) => {
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

module.exports = {
    it,
    exportsVariable,
    runCases
};
