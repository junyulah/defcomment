'use strict';

/**
 * require test file in node environment and send the results back
 */

try {
    Promise.resolve(require(process.argv[2])).then((testResults) => {
        process.send({
            type: 'message',
            data: testResults
        });
    }).catch(err => {
        process.send({
            type: 'error',
            errorStack: err.stack
        });
    });
} catch (err) {
    process.send({
        type: 'error',
        errorStack: err.stack
    });
}
