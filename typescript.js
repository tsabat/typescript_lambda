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
var ts = require('ntypescript');

exports.handler = function(event, context) {
  // don't allow `undefined` to creep in.
  var js = event.markup || "";
  if (js === "") {
    // bail on empty markup
    return context.succeed( {"markup": "" } );
  }

  var errors = [];
  var rslt = ts.transpile(js, {jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS}, "file.tsx", errors);
  if (errors.length > 0) {
    var error = errors[0];
    var line = 1;
    for (var i = 0, length = js.length; i < error.start; i++) {
      if (js.charAt(i) == '\n') {
        line++;
      }
    }
    return context.succeed( { "error": error.messageText, "line": line} );
  }
  context.succeed( {"markup": rslt } );
};
