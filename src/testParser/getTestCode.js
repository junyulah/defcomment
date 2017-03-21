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
         ${sampleString},
         null,
         requiredCurrentJs)
);`;
        } else if (tar === 'js') { // just push some js code
            return `cases.push(
   it('${id}', ${JSON.stringify(test.testVariables)},
        '${test.testVar}',
        ${sampleString},
        null,
        requiredCurrentJs)
)`;
        } else {
            return `cases.push(
    it('${id}', ${JSON.stringify(test.testVariables)},
         '${test.testVar}',
         ${sampleString},
         ${test.sample},
         requiredCurrentJs)
);`;
        }
    });

    let requirePart = shouldRequireCurrentJs(tests) ? `let requiredCurrentJs = require('${id}'); // require source code` : 'let requiredCurrentJs = null;';

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

let shouldRequireCurrentJs = (tests) => {
    let existVarRefer = tests.findIndex(({
        testVar
    }) => !!testVar) !== -1;

    if (existVarRefer) return true;

    let referInJs = tests.findIndex(({
        testVariables
    }) => testVariables.hasOwnProperty('r_c')) !== -1;

    if (referInJs) return true;
};
