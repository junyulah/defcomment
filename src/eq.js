'use strict'

let jsonEq = require('cl-jsoneq');

module.exports = (data1, data2) => {
    let ret = jsonEq(data1, data2);
    if(ret === true){
        return ret;
    }
    throw new Error('Data is not equal.');
    console.log(JSON.stringify(data1));
    console.log(JSON.stringify(data2));
};
