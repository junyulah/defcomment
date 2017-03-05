'use strict';

const COMMENT_BLOCK_REG = /\/\*[\s\S]*?\*\//;

const COMMENT_PREFIX_ADDITION = '*';

const MINIMAL_PREFIX_LENGTH = 2;

const MINIMAL_SUFFIX_LENGTH = 2;

const PARA_BLOCK_PREFIX = '#';

/**
 * comment is code is useful
 */

let parseComment = (code) => {
    let blocks = getCommentBlocks(code);

    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        let lines = wipeCommentSymbols(block.content);
        block.paraBlocks = getParaBlocks(lines);
    }

    return blocks;
};

/**
 * comment block = { content, next }
 *
 * parse source code's comments
 */
let getCommentBlocks = (code) => {
    let commentBlocks = [];
    let ret = null;

    while (ret = COMMENT_BLOCK_REG.exec(code)) { // eslint-disable-line
        let content = ret[0];
        let last = commentBlocks[commentBlocks.length - 1];
        if (last) {
            last.next = code.substring(0, ret.index);
        }
        code = code.substring(ret.index + content.length);
        commentBlocks.push({
            content
        });
    }

    let last = commentBlocks[commentBlocks.length - 1];
    if (last) {
        last.next = code;
    }

    return commentBlocks;
};

let wipeCommentSymbols = (comment) => {
    comment = comment.substring(MINIMAL_PREFIX_LENGTH);
    comment = comment.substring(0, comment.length - MINIMAL_SUFFIX_LENGTH);

    let lines = comment.split('\n');
    let newLines = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        line = line.trim();
        if (line) {
            while (line[0] === COMMENT_PREFIX_ADDITION) {
                line = line.substring(1);
                line = line.trim();
            }
            if (line) newLines.push(line);
        }
    }
    return newLines;
};

let getParaBlocks = (lines) => {
    let paraBlocks = [];
    let curBlock = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line[0] === PARA_BLOCK_PREFIX) {
            if (curBlock.length) paraBlocks.push(curBlock);
            curBlock = [line];
        } else {
            curBlock.push(line);
        }
    }

    if (curBlock.length) paraBlocks.push(curBlock);

    return paraBlocks;
};

module.exports = parseComment;
