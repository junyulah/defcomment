'use strict';

let path = require('path');
let del = require('del');
let spawnp = require('spawnp');

describe('deploy', () => {
    it('index', () => {
        let boxDir = path.resolve(__dirname, 'box');

        return del([
            path.resolve(__dirname, 'box/node_modules')
        ]).then(() => {
            return spawnp('npm', [
                'i',
                path.join(__dirname, '../../'),
                '--save-dev'
            ], {
                cwd: boxDir,
                stdio: 'inherit'
            });
        }).then(() => {
            return spawnp('./node_modules/.bin/deftest', [
                '-s', 'src',
                '-t', 'test/unit',
                '-d', 'test/dest'
            ], {
                cwd: boxDir,
                stdio: 'inherit'
            });
        });
    });
});
