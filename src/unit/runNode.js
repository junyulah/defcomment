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
    let waitingP = null;

    let wait = (p) => {
        waitingP = p;
    };

    if (typeof window !== 'undefined') {
        if (testVariables.hasOwnProperty('r_c')) {
            let f = new Function('assert', 'wait', getCurrentRequireObjName(id, testVariables), sampleString);
            f(assert, wait, requiredCurrentJs);
        } else {
            let f = new Function('assert', 'wait', sampleString);
            f(assert, wait);
        }
    } else {
        const vm = eval('require')('vm');
        const script = new vm.Script(sampleString);
        const sandbox = Object.assign(global, {
            assert,
            wait
        });
        if (testVariables.hasOwnProperty('r_c')) {
            sandbox[getCurrentRequireObjName(id, testVariables)] = requiredCurrentJs;
        }
        const context = new vm.createContext(sandbox);
        script.runInContext(context, {
            displayErrors: true
        });
    }

    return waitingP;
};

let getCurrentRequireObjName = (id, testVariables) => {
    return testVariables['r_c'] || getDefaultName(id);
};

let getDefaultName = (id) => {
    return path.basename(id, path.extname(id));
};
