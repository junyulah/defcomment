var replacer = (key, value) => {
    if (typeof value === 'function') {
        return value.toString();
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
