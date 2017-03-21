'use strict';

module.exports = (__sampleString__, __testVariables__, __wait__, __requiredCurrentJs__, __required_currentJs_name__) => {
    // add a local variable
    __sampleString__ = `var wait = __wait__;${__sampleString__}`;
    if (__testVariables__.hasOwnProperty('r_c')) {
        return eval(`var ${__required_currentJs_name__} = __requiredCurrentJs__;${__sampleString__}`);
    } else {
        return eval(__sampleString__);
    }
};
