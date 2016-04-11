'use strict';

let log = console.log; // eslint-disable-line

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
            log('\x1b[36m', 'could not find function name. please use "let(could change to var or const something) a = " or "function a " at the first none-empty line under comments.', '\x1b[0m]');
            log(block);
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
        return `runUnit('${id}', '${test.testVar}', ${test.sample});`;
    });

    return `
    try {
        require('${id}');
        var runUnit = require('${__dirname}/runUnit').runUnit;
        ${unitTests.join('\n')}
    } catch(err) {
        console.log('\x1b[36m', '[error happened when run unit case]', '\x1b[0m]');
        console.log(err);
    }
    `;
};

let getInjectCode = (tests, id) => {
    let varExports = tests.map(test =>
        `__exportsVariable('${id}', '${test.testVar}', ${test.testVar});`
    );

    return `;(function () {
        var __exportsVariable = require('${__dirname}/runUnit').exportsVariable;
        ${varExports.join("\n")}
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
