// This is nothing more than a file you can run locally to test the syntax of stylus
// once we have tests, we can ditch this.
var fs = require("fs"),
    less = require(process.cwd() + "/typescript.js");

var event = {
  //markup: "class TSC { awesome: boolean = true; }"
  markup: "var n: number = 'str';"
};



var context = {
  succeed: function(result) {
    console.log(result);
  }
};

less.handler(event, context);
