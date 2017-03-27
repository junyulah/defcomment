'use strict';

let run = require('./run');

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
let it = (id, testVariables, varName, sampleString, sample, cJs) => {
    return {
        fun: () => run(id, testVariables, varName, sampleString, sample, cJs),
        varName,
        id,
        sample,
        sampleString,
        testVariables
    };
};

module.exports = {
    it,
    exportsVariable,
    runCases
};
