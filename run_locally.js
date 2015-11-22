#!/usr/bin/env node

// This is nothing more than a file you can run locally to test the syntax of typscript
// To understand more about this, read the source of typescript.js
//
/* globals require process */

var fs = require("fs"),
    less = require(process.cwd() + "/typescript.js");

/* you can view failing typescript by adding `failing` as a command-line arg
 * to this file, like so:
 *
 * ```
 * ./run_locally.js failing
 * ```
 */
var markup = "class TSC { awesome: boolean = true; }";
if (process.argv[2] == "failing") {
  markup = "\n\nvar n: number = 'str';";
}

var event = {
  markup: markup
};

var context = {
  succeed: function(result) {
    console.log(result);
  }
};

less.handler(event, context);
