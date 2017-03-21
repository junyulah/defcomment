'use strict';

let assert = require('assert');

module.exports = (id, testVariables, varName, sampleString) => {
    try {
        run(id, testVariables, varName, sampleString);
    } catch (err) {
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

let run = (id, testVariables, varName, sampleString) => {
    if (typeof window !== 'undefined') {
        let f = new Function('assert', sampleString);
        f(assert);
    } else {
        const vm = eval('require')('vm');
        const script = new vm.Script(sampleString);
        const sandbox = {
            assert
        };
        const context = new vm.createContext(sandbox);
        script.runInContext(context, {
            displayErrors: true
        });
    }
};
