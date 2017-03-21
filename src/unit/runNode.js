'use strict';

let assert = require('assert');
let path = require('path');
let runJsAtEval = require('./runJsAtEval');

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
    let waitingP = null,
        ret = null;

    let wait = (p) => {
        waitingP = p;
    };

    if (typeof window !== 'undefined') {
        ret = runJsAtEval(sampleString, testVariables, wait, requiredCurrentJs, getCurrentRequireObjName(id, testVariables));
    } else {
        const vm = eval('require')('vm');
        const script = new vm.Script(sampleString);
        const sandbox = Object.assign(global, {
            assert,
            wait,
            require,
            __dirname: id
        });
        if (testVariables.hasOwnProperty('r_c')) {
            sandbox[getCurrentRequireObjName(id, testVariables)] = requiredCurrentJs;
        }
        const context = new vm.createContext(sandbox);
        ret = script.runInContext(context, {
            displayErrors: true
        });
    }

    return waitingP || ret;
};

let getCurrentRequireObjName = (id, testVariables) => {
    return testVariables['r_c'] || getDefaultName(id);
};

let getDefaultName = (id) => {
    return path.basename(id, path.extname(id));
};
