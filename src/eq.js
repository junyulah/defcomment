'use strict';

let jsonEq = require('cl-jsoneq');

let util = require('./util');
let stringData = util.stringData;

let log = console.log; // eslint-disable-line

let errorInfo = (data1, data2) => {
    log('\x1b[31m', '[error] Data is not equal. data1 is ' + stringData(data1) + ';  data2 is ' + stringData(data2), '\x1b[0m');
    let err = new Error('Data is not equal');
    log(err.stack);
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
    try {
        let ret = jsonEq(data1, data2);
        if (ret === true) {
            return ret;
        }
        errorInfo(data1, data2);
    } catch (err) {
        errorInfo(data1, data2);
    }
};
