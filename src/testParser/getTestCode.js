'use strict';

module.exports = (tests, id) => {
    let unitTests = tests.map(test => {
        let sampleString = JSON.stringify(test.sample.toString());
        return `cases.push(
    it('${id}',
         '${test.testVar}',
         ${test.sample},
         ${sampleString})
);`;
    });

    return `'use strict';
require('${id}'); // require source code

let unit = require('${__dirname}/unit');
let it = unit.it;
let runCases = unit.runCases;
let cases = [];

${unitTests.join('\n\n')}

var testRets = runCases(cases, '${id}');

if(typeof module === 'object') {
    module.exports = testRets;
}
`;
};
