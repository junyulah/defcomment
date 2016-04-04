'use strict'

let jsonEq = require('cl-jsoneq');

let util = require('./util');
let stringData = util.stringData;

module.exports = (data1, data2) => {
    let ret = jsonEq(data1, data2);
    if(ret === true){
        return ret;
    }
    throw new Error('Data is not equal. data1 is ' + stringData(data1) + ';  data2 is ' + stringData(data2));
};


