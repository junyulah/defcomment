'use strict';

let docTest = require('./build/docTest');
let log = console.log; // eslint-disable-line

module.exports = (opts) => {
    log('[auto unit tests] ----------------------');
    try {
        docTest.docToTest(opts);
    } catch (err) {
        log(err.stack);
    }
};
