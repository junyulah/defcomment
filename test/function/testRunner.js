'use strict';

let {
    runTests, runDirTests, runDirTestsWithResult
} = require('../../src/testRunner');

let assert = require('assert');

let path = require('path');

describe('testRunner', () => {
    let tempFile = path.join(__dirname, 'fixture/tmp.js');
    let tempTestFile = path.join(__dirname, 'fixture/tmp_test.js');

    it('base', () => {
        return runTests('/*##test\n[[[1,2],3]]\n*/\nlet add = (v1, v2) => v1 + v2;', tempFile, tempTestFile, {
            silent: true
        }).then(ret => {
            assert.deepEqual(ret.fail.length, 0);
            assert.deepEqual(ret.cases.length, 1);
        });
    });

    it('bash', () => {
        return runTests(`/*##test tar=bash
            cd ..
            echo 123
            pwd
            */;`, tempFile,

            tempTestFile, {
                silent: true
            }).then(ret => {
                assert.deepEqual(ret.fail.length, 0);
                assert.deepEqual(ret.cases.length, 1);
            });
    });

    it('bash-error', () => {
        return runTests(`/*##test tar=bash
            notjjjjjjjj
            */;`, tempFile,

            tempTestFile, {
                silent: true
            }).then((ret) => {
                assert.deepEqual(ret.fail.length, 1);
                assert.deepEqual(ret.cases.length, 1);
            });
    });

    it('run node code', () => {
        return runTests(`/*##test tar=js
            assert.equal(1 + 1, 2)
            */;`, tempFile,

            tempTestFile, {
                silent: true
            }).then(ret => {
                assert.deepEqual(ret.fail.length, 0);
                assert.deepEqual(ret.cases.length, 1);
            });
    });

    it('run node fail', () => {
        return runTests(`/*##test tar=js
            assert.equal(1 + 1, 3)
            */;`, tempFile,

            tempTestFile, {
                silent: true
            }).then(ret => {
                assert.deepEqual(ret.fail.length, 1);
                assert.deepEqual(ret.cases.length, 1);
            });
    });

    it('run node: require current js file as a global variable', () => {
        return runTests(`/*##test tar=js r_c=num
            assert.equal(1 + 3, num);
            */\nmodule.exports = 4;`, tempFile,

            tempTestFile, {
                silent: false
            }).then(ret => {
                assert.deepEqual(ret.fail.length, 0);
                assert.deepEqual(ret.cases.length, 1);
            });
    });

    it('run node: default require name', () => {
        return runTests(`/*##test tar=js r_c
            assert.equal(1 + 3, tmp);
            */\nmodule.exports = 4;`, tempFile,

            tempTestFile, {
                silent: false
            }).then(ret => {
                assert.deepEqual(ret.fail.length, 0);
                assert.deepEqual(ret.cases.length, 1);
            });
    });

    it('run node: promise', () => {
        return runTests(`/*##test tar=js r_c
            return new Promise((resolve) => {setTimeout(resolve, 1000)})
            */\nmodule.exports = 4;`, tempFile,

            tempTestFile, {
                silent: false
            }).then(ret => {
                assert.deepEqual(ret.fail.length, 0);
                assert.deepEqual(ret.cases.length, 1);
            });
    });

    it('run node: promise, reject', () => {
        return runTests(`/*##test tar=js r_c
            return new Promise((resolve, reject) => {setTimeout(reject, 1000)})
            */\nmodule.exports = 4;`, tempFile,

            tempTestFile, {
                silent: false
            }).then(ret => {
                assert.deepEqual(ret.fail.length, 1);
                assert.deepEqual(ret.cases.length, 1);
            });
    });

    it('run node: return', () => {
        return runTests(`/*##test tar=js r_c
            return 4;
            */\nmodule.exports = 4;`, tempFile,

            tempTestFile, {
                silent: false
            }).then(ret => {
                assert.deepEqual(ret.fail.length, 0);
                assert.deepEqual(ret.cases.length, 1);
            });
    });

    it('fail', () => {
        return runTests('/*##test\n[[[1,2],4], [[2,3],5]]\n*/\nlet add = (v1, v2) => v1 + v2;', tempFile, tempTestFile, {
            silent: true
        }).then(ret => {
            assert.deepEqual(ret.fail.length, 1);
            assert.deepEqual(ret.cases.length, 1);
        });
    });

    it('runDirTests', () => {
        return runDirTests('**/*.js', {
            srcDir: path.join(__dirname, './fixture/glob'),
            opts: {
                silent: true,
                clean: true
            }
        }).then(ret => {
            assert.deepEqual(ret.length, 2);
            assert.deepEqual(ret[0].fail.length, 1);
            assert.deepEqual(ret[0].cases.length, 2);
        });
    });

    it('run no require', () => {
        const DEAFULT_PATTERN = '**/*';

        return runDirTests(DEAFULT_PATTERN, {
            srcDir: path.join(__dirname, './fixture/bin'),
            opts: {
                silent: true,
                clean: true
            }
        }).then(ret => {
            assert.deepEqual(ret[0].cases[0].result.stdouts, '123\n');
            assert.deepEqual(ret[0].fail.length, 0);
            assert.deepEqual(ret[0].cases.length, 1);
        });
    });

    it('runDirTestsWithResult', () => {
        return runDirTestsWithResult('**/*.js', {
            srcDir: path.join(__dirname, './fixture/glob'),
            destDir: path.join(__dirname, './fixture/globDest'),
            testDir: path.join(__dirname, './fixture/globTest'),
            opts: {
                silent: true,
                clean: true
            }
        }).then(ret => {
            assert.deepEqual(ret.length, 2);
            assert.deepEqual(ret[0].fail.length, 1);
            assert.deepEqual(ret[0].cases.length, 2);
        });
    });
});
