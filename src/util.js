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

module.exports = {
    stringData
};
