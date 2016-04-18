'use strict';

let defcomment = require('../../src');
let util = require('../../src/util');
let visit = require('./visit');
let mkdirp = require('mkdirp');
let del = require('del');
let generateTests = defcomment.generateTests;
let path = require('path');

let logNormal = util.logNormal;
let logPass = util.logPass;
let logError = util.logError;
let logHint = util.logHint;

let Promise = global.Promise;

let docToTest = (opts) => {
    return getAllTestRets(opts).then((allRets) => {
        let sum = allRets.reduce((prev, cur) => {
            return prev + cur.cases.length;
        }, 0);
        let fails = allRets.reduce((prev, cur) => {
            return prev.concat(cur.fail);
        }, []);

        if (fails.length) {
            logError('[failed units tests: ]');
            fails.forEach((fail) => {
                logHint(`\t${fail.id}:${fail.varName}`);
            });
        }
        logPass('[test units results: ]');
        logPass('\tthe sum of tests: ' + sum);
        logPass('\tthe sum of passing tests: ' + (sum - fails.length));

        logNormal('\n\n');
    }).catch(err => logError(err.stack));
};

let getAllTestRets = (opts) => {
    let srcDir = opts.srcDir;
    let distDir = opts.distDir;
    let testDir = opts.testDir;
    return Promise.all([del(distDir), del(testDir)]).then(() => {
        return visit(srcDir, {
            handleFile: (file) => {
                let agu = path.relative(srcDir, file);
                let dist = distDir + '/' + agu;
                let test = testDir + '/' + agu;
                return Promise.all([mkdirp(path.dirname(test)), mkdirp(path.dirname(dist))]).then(() => generateTests(file, dist, test));
            }
        });
    }).then(() => {
        let allResults = [];
        return visit(testDir, {
            handleFile: (file) => {
                if (path.extname(file) === '.js') {
                    delete require.cache[require.resolve(file)];
                    let testRets = null;
                    try {
                        testRets = require(file);
                    } catch (err) {
                        logError('[Error-require-test-file] test file is: ' + file);
                        logNormal(err.stack);
                    }
                    allResults.push(testRets);
                }
            }
        }).then(() => {
            return Promise.resolve(allResults);
        });
    });
};

module.exports = {
    docToTest
};
