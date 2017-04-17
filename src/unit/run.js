'use strict';

let path = require('path');

let runMatrixTestData = require('./runMatrixTestData');

let runJs = require('./runJs');

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

module.exports = (id, testVariables, varName, sampleString, sample, requiredCurrentJs) => {
    let tar = testVariables.tar;
    if (tar === 'bash') {
        return runBash(id, testVariables, varName, sampleString, sample, requiredCurrentJs);
    } else if (tar === 'js') {
        return runJs(id, testVariables, varName, sampleString, sample, requiredCurrentJs);
    } else {
        return runMatrixTestData(id, testVariables, varName, sampleString, sample, requiredCurrentJs);
    }
};
