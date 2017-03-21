'use strict';

let path = require('path');

const UNIT_PATH = path.resolve(__dirname, '../unit');

/**
 * generate inject code
 */

module.exports = (tests, id) => {
    let varExports = tests.map(test =>
        test.testVar? `__exportsVariable('${id}', '${test.testVar}', ${test.testVar});`: ''
    );

    return `!(function () {
    var __exportsVariable = require('${UNIT_PATH}').exportsVariable;
    ${varExports.join('\n')}
})();`;
};
