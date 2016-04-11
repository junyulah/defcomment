# defcomment

## goal

A simple library to translate code commenting to tests or other.

## install

`npm i defcomment --save-dev`

## generate test

### how to write tests in commenting

```js
/**
 * other commenting
 * 
 * the test commenting
 * ## test
 * [
 *    [[1, 2], 3]
 *    [[4, 5], 9]
 * ]
 */
var add = (a, b) => a + b
```

In our code, we use `## test` as commenting title (you can use one or more # before the word test).the next lines after `## test` is our test data. It's a matrix which contain some arrays, each array has two value. The first is input arguments, the second is the expected response.

- js code in  test commenting

In your test data matrix, you can use js code. For example,

```js
/**
 * define map function
 *
 * ## test
 * [
 *      [[v => ++v, [3, 4, 7]], [4, 5, 8]]
 * ]
 */
var map = (handler, data) => {}
```

### quick usage

defComment provides a quick apporach. Just write a little code like these:

```js
var quick = require('defcomment/ext/quick');
quick({
    srcDir: __dirname + '/src', // your source directory
    distDir: __dirname + '/test/unit/ret', // some place to hold compiled code, do not use these code for other usage.
    testDir: __dirname + '/test/unit/test' // some place to hold your generated tests.
});
```

Then, run this file, you will have a file watcher and when you change your source code, your unit tests will run automatically.

- pay attention

srcDir distDir testDir must be absolute path.

### how about high order function

When your unit test is about a high order function, you should expand your array. See the example

```js
/**
 * ## test
 * [
 *      [[3], [5], 15],
 *      [[6], [7], 42]
 * ]
 */
var high = (a) => (b) => a * b;
```

### how about exception

If you function throw an error, you could just set expected output as an error.

In the comparation between real output and expected output, just compare error message.

```js
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
```

### general usage

- step1 add commenting to you code, like this

- step2 compile source code

```js
var def = require('defcomment');
var generateTests = def.generateTests;

generateTests(srcFilePath, distFilePath, testPath);

```

Using generateTests api, pass source code file path, dist file path and test file path.

- step3 run tests

Just require the test files (generated in the step2).

```
require('testfile.js'); // testfile.js generated in step2
```
