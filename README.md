# defcomment

## goal

A simple library to translate code commenting to tests or other.

## generate test

### step1 add commenting to you code, like this

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

In our code, we use `## test` as commenting title (you can use one or more # before the word test).the next lines after `## test` is out test data. It's a matrix which contain some arrays, each array has two value. The first is input arguments, the second is the expected response.

### step2 compile source code

```js
var def = require('defcomment');
var generateTests = def.generateTests;

generateTests(srcFilePath, distFilePath, testPath);

```

Use generateTests api, pass source code file path, dist file path and test file path.

### step3 run tests

Just require the test files (generated in the step2).
