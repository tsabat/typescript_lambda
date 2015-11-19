/* globals require, module, exports ts*/

var TypeScriptSimple = require('typescript-simple').TypeScriptSimple;
// https://github.com/Microsoft/TypeScript/blob/v1.5.0-beta/bin/typescriptServices.d.ts#L1118
var tss = new TypeScriptSimple({target: 1, noImplicitAny: true});

exports.handler = function(event, context) {
  try {
    var js = event.markup || "";
    if (js === "") {
      context.succeed( {"markup": "" } );
    } else {
      // this value was just increased until we exceeded the limit
      // this provides dubious security because any of these files
      // could be closed at any time.
      //var limit = 13;
      //posix.setrlimit("nofile", {soft: limit, hard: limit});
      var rslt = tss.compile(js);
      context.succeed( {"markup": rslt } );
    }
  } catch(e) {

    console.log(e.type);

    console.log('start');
    for(var i=0; i<0; i++) {
      console.log(e[i]);
    }
    console.log('end');

    var line = 100;

    try {
      // Coffescript line numbers start at 0. Geezus
      line = e.file.pos;
    } catch(err) {
      // go on with line number 1
    }

    var msg = (typeof(e) === "object") ? e.messageText + " TS" + e.code : e;
    context.succeed( { "error": msg, "line": line } );
  }

};
