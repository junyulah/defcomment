'use strict';

let log = console.log; // eslint-disable-line
let util = require('./util');
let logHint = util.logHint;
let logNormal = util.logNormal;

/**
 * blocks -> (injectCode, testCodes)
 */
let testParser = (blocks, id) => {
    let tests = blocks.reduce((prev, block) => {
        let paraBlocks = block.paraBlocks;
        let paraBlock = paraBlocks.find((paraBlock) => {
            let title = getTitle(paraBlock);
            if (title === 'test') {
                return true;
            }
        });
        if (!paraBlock) {
            return prev;
        }
        // analysis test paraBlock
        let sample = getTestSample(paraBlock);
        if (!sample) return prev;
        let testVar = getTestVariable(block.next);
        if (!testVar) {
            logHint('could not find function name. please use "let(could change to var or const something) a = " or "function a " at the first none-empty line under comments.');
            logNormal(block);
            return prev;
        }
        prev.push({
            sample,
            testVar
        });
        return prev;
    }, []);
    return {
        injectCode: getInjectCode(tests, id),
        testCode: getTestCode(tests, id),
        tests
    };
};

let getTestCode = (tests, id) => {
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
require('${id}');
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

let getInjectCode = (tests, id) => {
    let varExports = tests.map(test =>
        `__exportsVariable('${id}', '${test.testVar}', ${test.testVar});`
    );

    return `;(function () {
        var __exportsVariable = require('${__dirname}/unit').exportsVariable;
        ${varExports.join('\n')}
    })();
    `;
};

let getTitle = (paraBlock) => {
    let type = paraBlock[0] || '';
    let titles = type.match(/#+(.*)/) || [];
    let title = titles[1];
    if (!title) return title;
    title = title.trim();
    return title;
};

let getTestSample = (testBlock) => {
    testBlock.shift();
    let code = testBlock.join('\n');
    code = code.trim();
    return code;
};

let getTestVariable = (next) => {
    next = next.trim();
    let assignReg = /(\w+\s+ | \s*)\s*(\S+)\s*\=/;
    let funDefReg = /\s*function\s*(\S+)\s*\(/;
    let rets = next.match(assignReg);
    if (rets) return rets[2];
    rets = next.match(funDefReg);
    if (rets) return rets[1];
    return null;
};

module.exports = testParser;
