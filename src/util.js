'use strict';

var log = console.log; // eslint-disable-line

var logError = (info) => {
    log('\x1b[31m', info, '\x1b[0m');
};

var logNormal = (info) => {
    log(info);
};

var logPass = (info) => {
    log('\x1b[36m', info, '\x1b[0m');
};

var logHint = (info) => {
    log('\x1b[33m', info, '\x1b[0m');
};

module.exports = {
    logError,
    logNormal,
    logPass,
    logHint
};
