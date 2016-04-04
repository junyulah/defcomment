'use strict'
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
            console.warn('could not find function name. please use "let(could change to var or const something) a = " or "function a " at the first none-empty line under comments.');
            console.log(block);
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
        return `
        var __env_global = null;
        if(typeof window !== 'undefined') {
            __env_global = window;
        } else {
            __env_global = global;
        }
        (function () { 
            console.log('[test] ${id}:${test.testVar} --------');
            var testDataMatrix = ${test.sample};
            var func = __env_global['__test_probe__']['${id}']['${test.testVar}']
            testDataMatrix.map((testData) => {
                var input = testData[0];
                var expectedOuput = testData[1];
                var ret = func.apply(undefined, input);
                eq(ret, expectedOuput);
                console.log('[test] equal for input ' + input + ' and output ' + expectedOuput + ' . The real output is ' + ret);
            });

            console.log('[test] pass -----------------');
        })();`;
    });

    return `
            require('${id}');
            var eq = require('${__dirname}/eq');
            ${unitTests.join('\n')}
        `;
};

let getInjectCode = (tests, id) => {
    let varExports = tests.map(test =>
        `__env_global['__test_probe__']['${id}']['${test.testVar}'] = ${test.testVar};`
    );

    return `;(function () {
        var __env_global = null;
        if(typeof window !== 'undefined') {
            __env_global = window;
        } else {
            __env_global = global;
        }
        __env_global['__test_probe__'] = __env_global['__test_probe__'] || {};
        __env_global['__test_probe__']['${id}'] = __env_global['__test_probe__']['${id}'] || {};
        ${varExports}
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
