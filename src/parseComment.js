/**
 * comment is code is useful
 */
'use strict';

let parseComment = (code) => {
    let blocks = getCommentBlocks(code);
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        let lines = preComment(block.content);
        block.paraBlocks = getParaBlocks(lines);
    }
    return blocks;
};

/**
 * comment block = { content, next }
 */
let getCommentBlocks = (code) => {
    let commentBlocks = [];
    let commentBlockReg = /\/\*[\s\S]*?\*\//;
    let ret = null;
    while (ret = commentBlockReg.exec(code)) {
        let content = ret[0];
        let last = commentBlocks[commentBlocks.length - 1];
        if (last)
            last.next = code.substring(0, ret.index);
        code = code.substring(ret.index + content.length);
        commentBlocks.push({
            content
        });
    }
    let last = commentBlocks[commentBlocks.length - 1];
    if (last)
        last.next = code;

    return commentBlocks;
};

let preComment = (comment) => {
    comment = comment.substring(2);
    comment = comment.substring(0, comment.length - 2);
    let lines = comment.split('\n');
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        line = line.trim();
        if (line) {
            while (line[0] === '*') {
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
        if (line[0] === '#') {
            if (curBlock.length) paraBlocks.push(curBlock);
            curBlock = [line];
        } else {
            curBlock.push(line);
        }
    }
    if (curBlock) paraBlocks.push(curBlock);
    return paraBlocks;
};

module.exports = parseComment;
