#!/usr/bin/env node

'use strict';

let {
    watchDirTests, runDirTestsWithResult
} = require('..');

let yargs = require('yargs');

yargs.usage('Usage: $0 -s [src directory] -d [dest directory] -t [test directory] -c -q --watch').demandOption(['s']);

let {
    argv
} = yargs;

let method = runDirTestsWithResult;

if (argv.watch) {
    method = watchDirTests;
}

method(argv.p, {
    srcDir: argv.s,
    destDir: argv.d,
    testDir: argv.t,
    opts: {
        clean: argv.c,
        silent: argv.q
    }
});
