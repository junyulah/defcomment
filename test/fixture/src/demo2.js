/**
 * define map function
 *
 * ## test
 * [
 *      [[v => ++v, [3, 4, 7]], [4, 5, 8]]
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
