'use strict';

let assert = require('assert');
let path = require('path');

module.exports = (id, testVariables, varName, sampleString, sample, requiredCurrentJs) => {
    try {
        run(id, testVariables, varName, sampleString, requiredCurrentJs);
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

let run = (id, testVariables, varName, sampleString, requiredCurrentJs) => {
    if (typeof window !== 'undefined') {
        if (testVariables.hasOwnProperty('r_c')) {
            let f = new Function('assert', getCurrentRequireObjName(id, testVariables), sampleString);
            f(assert, requiredCurrentJs);
        } else {
            let f = new Function('assert', sampleString);
            f(assert);
        }
    } else {
        const vm = eval('require')('vm');
        const script = new vm.Script(sampleString);
        const sandbox = {
            assert
        };
        if (testVariables.hasOwnProperty('r_c')) {
            sandbox[getCurrentRequireObjName(id, testVariables)] = requiredCurrentJs;
        }
        const context = new vm.createContext(sandbox);
        script.runInContext(context, {
            displayErrors: true
        });
    }
};

let getCurrentRequireObjName = (id, testVariables) => {
    return testVariables['r_c'] || getDefaultName(id);
};

let getDefaultName = (id) => {
    return path.basename(id, path.extname(id));
};
