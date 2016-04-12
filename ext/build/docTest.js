'use strict';

let defcomment = require('../../src');
let visit = require('./visit');
let mkdirp = require('mkdirp');
let del = require('del');
let generateTests = defcomment.generateTests;
let path = require('path');
let fs = require('fs');

let log = console.log; // eslint-disable-line

let Promise = global.Promise;

let docToTest = (opts) => {
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
        return visit(testDir, {
            handleFile: (file) => {
                if (path.extname(file) === '.js') {
                    log('\x1b[34m', '[run tests of test file] ' + file, '\x1b[0m');
                    let code = fs.readFileSync(file, 'utf-8');
                    eval(code);
                }
            }
        });
    });
};

module.exports = {
    docToTest
};
