'use strict';

let fs = require('fs');
let promisify = require('es6-promisify');
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);

let Promise = global.Promise;

let id = v => v;
let isPromise = v => v && typeof v === 'object' && typeof v.then === 'function';

let visit = (p, opts) => {
    opts = opts || {};
    let handleFile = opts.handleFile || id;
    let handleDir = opts.handleDir || id;

    return stat(p).then((stats) => {
        if (stats.isFile()) {
            let ret = handleFile(p);
            if (isPromise(ret)) {
                return ret;
            } else {
                return Promise.resolve(ret);
            }
        } else if (stats.isDirectory()) {
            let ret = handleDir(p);
            if (isPromise(ret)) {
                return visitChilds(p, opts);
            } else {
                return visitChilds(p, opts);
            }
        } else {
            return Promise.resolve();
        }
    });
};

let visitChilds = (p, opts) => readdir(p).then((files) => {
    return Promise.all(files.map(file => {
        file = p + '/' + file;
        return visit(file, opts);
    }));
});

module.exports = visit;
