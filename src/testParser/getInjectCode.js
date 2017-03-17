'use strict';

/**
 * generate inject code
 */

module.exports = (tests, id) => {
    let varExports = tests.map(test =>
        test.testVar? `__exportsVariable('${id}', '${test.testVar}', ${test.testVar});`: ''
    );

    return `!(function () {
    var __exportsVariable = require('${__dirname}/unit').exportsVariable;
    ${varExports.join('\n')}
})();`;
};
