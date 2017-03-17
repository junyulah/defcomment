'use strict';

/**
 * TODO generate bin file tests
 */
module.exports = (tests, id) => {
    let unitTests = tests.map(test => {
        let sampleString = JSON.stringify(test.sample.toString());
        if (test.testVariables.tar === 'bash') {
            return `cases.push(
    it('${id}', ${JSON.stringify(test.testVariables)},
         '${test.testVar}',
         ${sampleString})
);`;
        } else {
            return `cases.push(
    it('${id}', ${JSON.stringify(test.testVariables)},
         '${test.testVar}',
         ${sampleString},
         ${test.sample})
);`;
        }
    });

    let requirePart = tests.findIndex(({
        testVar
    }) => !!testVar) !== -1 ? `require('${id}'); // require source code` : '';

    return `'use strict';
${requirePart}
let unit = require('${__dirname}/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

${unitTests.join('\n\n')}

var testRets = runCases(cases, '${id}');

if(typeof module === 'object') {
    module.exports = testRets;
}`;
};
