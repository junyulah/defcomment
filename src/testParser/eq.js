'use strict';

let jsonEq = require('cl-jsoneq');

let {
    logError, logNormal
} = require('../util');

let stringData = require('./stringData');

let errorInfo = (data1, data2) => {
    let errorMsg = '[error] Data is not equal. real is ' + stringData(data1) + ';  expect ' + stringData(data2);
    logError(errorMsg);
    let err = new Error('Data is not equal');
    err.errorMsg = errorMsg;
    logNormal(err.stack);
    throw err;
};

module.exports = (data1, data2) => {
    if (data1 instanceof Error) {
        if (!(data2 instanceof Error)) {
            errorInfo(data1, data2);
        } else {
            if (data1.message === data2.message)
                return true;
            errorInfo(data1, data2);
        }
    }
    let ret = null;
    try {
        ret = jsonEq(data1, data2);
    } catch (err) {
        errorInfo(data1, data2);
        return;
    }
    if (ret === true) {
        return ret;
    }
    errorInfo(data1, data2);
};
