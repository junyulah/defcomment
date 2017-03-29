'use strict';

let assert = require('assert');
let path = require('path');
let runJsAtEval = require('./runJsAtEval');
let {
    logError, logPass, logHint, logNormal
} = require('./log');

const GLOBAL_OBJECT_PROPERTIES = [
    'NaN', 'Infinity', 'undefined', 'eval', 'parseInt', 'parseFloat', 'isNaN',
    'isFinite', 'decodeURI', 'decodeURIComponent', 'encodeURI',
    'encodeURIComponent', 'Object', 'Function', 'Array', 'String', 'Boolean',
    'Number', 'Date', 'RegExp', 'Error', 'EvalError', 'RangeError',
    'ReferenceError', 'SyntaxError', 'TypeError', 'URIError', 'Math', 'JSON'
];

const GLOBAL_OBJECT_PROPERTY_MAP = {};

for (var n = 0; n < GLOBAL_OBJECT_PROPERTIES.length; n++) {
    GLOBAL_OBJECT_PROPERTY_MAP[GLOBAL_OBJECT_PROPERTIES[n]] =
        GLOBAL_OBJECT_PROPERTIES[n];
}

module.exports = (id, testVariables, varName, sampleString, sample, cJs) => {
    try {
        return Promise.resolve(run(id, testVariables, varName, sampleString, cJs)).then(() => {
            logPass(`[test] ${id}`);
            logHint(sampleString);

            return {
                result: true
            };
        }).catch((err = {}) => {
            logError('[error happened when test code: \n' + sampleString + ']');
            logNormal(err.stack);

            return {
                result: false,
                stack: err.stack,
                errorMsg: err.errorMsg || err.toString()
            };
        });
    } catch (err) {
        logError('[error happened when test code: \n' + sampleString + ']');
        logNormal(err.stack);

        return {
            result: false,
            stack: err.stack,
            errorMsg: err.errorMsg || err.toString()
        };
    }
};

let run = (id, testVariables, varName, sampleString, cJs) => {
    let waitingP = null,
        ret = null;

    let wait = (p) => {
        waitingP = p;
    };

    if (typeof window !== 'undefined') {
        ret = runJsAtEval(sampleString, testVariables, wait, cJs, getCurrentRequireObjName(id, testVariables));
    } else {
        const vm = eval('require')('vm');
        const script = new vm.Script(sampleString);
        const sandbox = {
            require: eval('require'),
            assert,
            wait,
            __dirname: path.dirname(id)
        };
        if (testVariables.hasOwnProperty('r_c')) {
            sandbox[getCurrentRequireObjName(id, testVariables)] = cJs;
        }
        const context = createContext(sandbox);
        ret = script.runInContext(context, {
            displayErrors: true
        });
    }

    return waitingP || ret;
};

let createContext = (sandbox = {}) => {
    const vm = eval('require')('vm');
    let context = vm.createContext(sandbox);
    context.global = context;

    var names = Object.getOwnPropertyNames(global);
    for (var n = 0; n < names.length; n++) {
        var name = names[n];
        if (name === 'global')
            continue;
        if (GLOBAL_OBJECT_PROPERTY_MAP[name] === undefined) {
            Object.defineProperty(context, name,
                Object.getOwnPropertyDescriptor(global, name));
        }
    }

    return context;
};

let getCurrentRequireObjName = (id, testVariables) => {
    return testVariables['r_c'] || getDefaultName(id);
};

let getDefaultName = (id) => {
    return path.basename(id, path.extname(id));
};
