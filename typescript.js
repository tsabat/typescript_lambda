/* globals require, module, exports ts*/

/*
 * CodePen's lambda implementation of TypeScript.  Depends on node module
 * typescript-simple.  Read about that here:
 *
 * https://github.com/teppeis/typescript-simple
 *
 * Unlike other preprocessors, TypeScript does not have a `.compile` method
 * leaving us to ugly hacks like this one.
 *
 * This module is in the format required by AWS Lambda.  Read about it here:
 *
 * http://docs.aws.amazon.com/lambda/latest/dg/walkthrough-custom-events-create-test-function.html
 *
 */

// Target: ES5
// https://github.com/Microsoft/TypeScript/blob/release-1.6/lib/typescriptServices.d.ts
var TypeScriptSimple = require("typescript-simple").TypeScriptSimple;
var tss = new TypeScriptSimple({target: 1, noImplicitAny: true, jsx: 2});

exports.handler = function(event, context) {
  try {
    // don't allow `undefined` to creep in.
    var js = event.markup || "";
    if (js === "") {
      // bail on empty markup
      return context.succeed( {"markup": "" } );
    }

    var rslt = tss.compile(js);
    context.succeed( {"markup": rslt } );
  } catch(e) {

    var line = 0;
    var message = "Error finding line number.  Please Contact CodePen Support";

    var match = e.stack.match(/Error: L(\d+): (.+)/);
    if (match && match.length >= 2) {
      line    = match[1];
      message = match[2];
    }

    context.succeed( { "error": message, "line": parseInt(line) + 1} );
  }

};
