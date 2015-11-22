#!/usr/bin/env node

// This is nothing more than a file you can run locally to test the syntax of typscript
// To understand more about this, read the source of typescript.js
//
/* globals require process */

var fs = require("fs"),
    less = require(process.cwd() + "/typescript.js"),
    fs = require("fs");

/* you can view failing typescript by adding `failing` as a command-line arg
 * to this file, like so:
 *
 * ```
 * ./run_locally.js failing
 * ```
 */

function markupFromDisk (type) {
  return fs.readFileSync("./markup/" + type, "utf8");
}

var userDefinedFile = process.argv[2];

var markup = "";
if (userDefinedFile) {
  markup = markupFromDisk(userDefinedFile);
} else {
  markup = markupFromDisk("valid_typescript");
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
