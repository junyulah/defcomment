'use strict';

let path = require('path');

let runMatrixTestData = require('./runMatrixTestData');

let runNode = require('./runNode');

let runBash = (id, testVariables, varName, sampleString) => {
    let {
        exec
    } = eval('require')('child_process');

    return new Promise((resolve) => {
        let child = exec(sampleString, {
            cwd: path.dirname(id)
        }, (err, stdouts, stderrs) => {
            if (err) {
                resolve({
                    result: false,
                    stack: err.stack,
                    errorMsg: err.errorMsg || err.toString()
                });
            } else {
                resolve({
                    result: true,
                    stdouts,
                    stderrs
                });
            }
        });
        child.stdout.on('data', (stdout) => {
            console.log(stdout); // eslint-disable-line
        });
        child.stderr.on('data', (stderr) => {
            console.log(stderr); // eslint-disable-line
        });
    });
};

module.exports = (id, testVariables, varName, sampleString, sample) => {
    let tar = testVariables.tar;
    if (tar === 'bash') {
        return runBash(id, testVariables, varName, sampleString, sample);
    } else if (tar === 'js') {
        return runNode(id, testVariables, varName, sampleString, sample);
    } else {
        return runMatrixTestData(id, testVariables, varName, sampleString, sample);
    }
};
