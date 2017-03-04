/**
 * define map function
 *
 * ## test
 * [
 *      [[v => ++v, [3, 4, 7]], [4, 5, 8]],
 *      [[v => ++v, [1, 2, 3]], [2, 3, 4]]
 * ]
 */

var map = (handler, data) => {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if(handler)
            item = handler(item);
        result.push(item);
    }
    return result;
};

/**
 * ## test
 * [
 *      [[3], [5], 15],
 *      [[6], [7], 42]
 * ]
 */
var high = (a) => (b) => a * b;

/**
 * ## test
 * [
 *      [[2], 2],
 *      [[-1], new Error('v is too little. v = -1')]
 * ]
 */
var error = (v) => {
    if(v < 0) {
        throw new Error('v is too little. v = ' + v);
    }
    return v;
};

;(function () {
        var __exportsVariable = require('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/src/unit').exportsVariable;
        __exportsVariable('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/fixture/ret/demo2.js', 'map', map);
__exportsVariable('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/fixture/ret/demo2.js', 'high', high);
__exportsVariable('/Users/yuer/workspaceforme/category/career/container/opensource/defcomment/test/fixture/ret/demo2.js', 'error', error);
    })();
    