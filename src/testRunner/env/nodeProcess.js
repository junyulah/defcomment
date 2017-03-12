'use strict';

/**
 * require test file in node environment and send the results back
 */

process.send(require(process.argv[2]));
