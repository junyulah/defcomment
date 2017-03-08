# defcomment
 
[![Build Status](https://travis-ci.org/LoveKino/defcomment.svg?branch=master)](https://travis-ci.org/LoveKino/defcomment)
[![Coverage Status](https://coveralls.io/repos/github/LoveKino/defcomment/badge.svg)](https://coveralls.io/github/LoveKino/defcomment)

## goal

A simple library to translate code commenting to tests or other.

## install

`npm i defcomment -g` or `npm i defcomment --save-dev` 

## run

- quickest

`deftest -s project/src` or `./node_modules/.bin/deftest -s project/src`

- assign dest directory and test directory

`deftest -s project/src -t project/test/unit -d project/test/dest`

- watch

Just add `--watch`

`deftest -s project/src --watch`

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
