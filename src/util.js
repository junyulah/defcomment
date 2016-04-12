var log = console.log; // eslint-disable-line

var replacer = (key, value) => {
    if (typeof value === 'function') {
        return '[function] ' + value.toString();
    } else if (value instanceof Error) {
        return '[error] ' + value.message;
    }
    return value;
};

var stringData = (data) => {
    try {
        return JSON.stringify(data, replacer);
    } catch (err) {
        return data.toString();
    }
};

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
    stringData,
    logError,
    logNormal,
    logPass,
    logHint
};
