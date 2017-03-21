'use strict';

/**
 * log information through parent process io
 */

module.exports = {
    logError: (info) => {
        process && process.send && process.send({
            type: 'log',
            data: ['logError', info]
        });
    },

    logNormal: (info) => {
        process && process.send && process.send({
            type: 'log',
            data: ['logNormal', info]
        });
    },

    logPass: (info) => {
        process && process.send && process.send({
            type: 'log',
            data: ['logPass', info]
        });
    },

    logHint: (info) => {
        process && process.send && process.send({
            type: 'log',
            data: ['logHint', info]
        });
    }
};
