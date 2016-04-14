'use strict';

let chokidar = require('chokidar');
let docTest = require('./build/docTest');
let log = console.log; // eslint-disable-line

module.exports = (opts) => {
    let watcher = chokidar.watch(opts.srcDir, {
        ignored: /node_modules/
    });

    watcher.on('all', () => {
        log('[auto unit tests] ----------------------');
        try {
            docTest.docToTest(opts);
        } catch (err) {
            log(err.stack);
        }
    });
};
