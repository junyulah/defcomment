'use strict';

let getInjectCode = require('./getInjectCode');
let getTestCode = require('./getTestCode');
let {
    parseSimpleKVLine
} = require('../util');

/**
 * (blocks, id) -> (injectCode, testCodes)
 *
 * parse blocks of comment data to test code
 */
let testParser = (blocks, id, {
    testTitle = 'test', testEnd = '<!--testEnd-->'
} = {}) => {
    let tests = blocks.reduce((prev, block) => {
        // only one test paragraph in on block
        let testParaBlock = findTestPara(block, testTitle);

        if (!testParaBlock) {
            return prev;
        }

        let title = getTitle(testParaBlock);
        // parse variables
        let testVariables = parseSimpleKVLine(title);
        testVariables.tar = testVariables.tar || 'function';

        // analysis test paraBlock
        let sample = getTestSample(testParaBlock, {
            testEnd
        });
        if (!sample) return prev;

        let testVar = getNextDefiningVariable(block.next);
        if (!testVar && testVariables.tar === 'function') {
            throw new Error(`could not find function name. please use "let(or var or const) a = " or "function a " at the first none-empty line under comments. ${JSON.stringify(block)}`);
        }

        prev.push({
            sample,
            testVar,
            testVariables
        });

        return prev;
    }, []);

    return {
        injectCode: getInjectCode(tests, id),
        testCode: getTestCode(tests, id),
        tests
    };
};

let findTestPara = (block, testTitle) => {
    // only one test paragraph in on block
    return block.paraBlocks.find((paraBlock) => {
        let title = getTitle(paraBlock) || '';
        if (title.indexOf(testTitle) === 0) {
            if (title.length > testTitle.length) {
                if (/\s/.test(title[testTitle.length])) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        }
    });
};

let getTitle = (paraBlock) => {
    let type = paraBlock[0] || '';
    let titles = type.match(/#+(.*)/) || [];
    let title = titles[1];
    if (!title) return title;
    title = title.trim();
    return title;
};

let getTestSample = (testBlock, {
    testEnd
}) => {
    testBlock.shift();

    let lines = [];

    for (let i = 0; i < testBlock.length; i++) {
        let line = testBlock[i];
        if (line.trim().startsWith(testEnd)) {
            break;
        }
        lines.push(line);
    }

    return lines.join('\n').trim();
};

/**
 * at the first line below comment block, find the variable defined
 */
let getNextDefiningVariable = (next) => {
    next = next.trim();
    let assignReg = /(\w+\s+ | \s*)\s*(\S+)\s*\=/; // var/let/const a = ...

    let funDefReg = /\s*function\s*(\S+)\s*\(/; // function a()...

    let rets = next.match(assignReg);
    if (rets) return rets[2];

    rets = next.match(funDefReg);
    if (rets) return rets[1];

    return null;
};

module.exports = testParser;
