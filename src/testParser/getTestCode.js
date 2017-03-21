'use strict';

let path = require('path');

const UNIT_PATH = path.resolve(__dirname, '../unit');

/**
 * TODO generate bin file tests
 */
module.exports = (tests, id) => {
    let unitTests = tests.map(test => {
        let sampleString = JSON.stringify(test.sample.toString());
        let tar = test.testVariables.tar;
        if (tar === 'bash') {
            return `cases.push(
    it('${id}', ${JSON.stringify(test.testVariables)},
         '${test.testVar}',
         ${sampleString})
);`;
        } else if (tar === 'node') { // just push some js code
            return `cases.push(
   it('${id}', ${JSON.stringify(test.testVariables)},
        '${test.testVar}',
        ${sampleString}),
        (function(){
            ${test.sample}
        })()
)`;
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
let unit = require('${UNIT_PATH}');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

${unitTests.join('\n\n')}

var testRets = runCases(cases, '${id}');

if(typeof module === 'object') {
    module.exports = testRets;
}`;
};
