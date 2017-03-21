'use strict';

let assert = require('assert');
let path = require('path');

module.exports = (id, testVariables, varName, sampleString, sample, requiredCurrentJs) => {
    try {
        return Promise.resolve(run(id, testVariables, varName, sampleString, requiredCurrentJs)).then(() => {
            return {
                result: true
            };
        }).catch((err = {}) => {
            return {
                result: false,
                stack: err.stack,
                errorMsg: err.errorMsg || err.toString()
            };
        });
    } catch (err) {
        return {
            result: false,
            stack: err.stack,
            errorMsg: err.errorMsg || err.toString()
        };
    }
};

let run = (id, testVariables, varName, sampleString, requiredCurrentJs) => {
    if (typeof window !== 'undefined') {
        if (testVariables.hasOwnProperty('r_c')) {
            let f = new Function('assert', getCurrentRequireObjName(id, testVariables), sampleString);
            return f(assert, requiredCurrentJs);
        } else {
            let f = new Function('assert', sampleString);
            return f(assert);
        }
    } else {
        sampleString = `(() => {${sampleString}})()`;
        const vm = eval('require')('vm');
        const script = new vm.Script(sampleString);
        const sandbox = Object.assign(global, {
            assert
        });
        if (testVariables.hasOwnProperty('r_c')) {
            sandbox[getCurrentRequireObjName(id, testVariables)] = requiredCurrentJs;
        }
        const context = new vm.createContext(sandbox);
        return script.runInContext(context, {
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
