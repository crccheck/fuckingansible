// http://krasimirtsonev.com/blog/article/Simple-command-line-parser-in-JavaScript
var CommandParser = (function() {
  var parse = function(str, lookForQuotes) {
    var args = [];
    var readingPart = false;
    var part = '';
    for(var i=0; i<str.length; i++) {
      if(str.charAt(i) === ' ' && !readingPart) {
        args.push(part);
        part = '';
      } else {
        if(str.charAt(i) === '\"' && lookForQuotes) {
          readingPart = !readingPart;
        } else {
          part += str.charAt(i);
        }
      }
    }
    args.push(part);
    return args;
  }
  var getCommandName = function(str) {
    return str.split(" ").shift();
  }
  return {
    parse: parse,
    getCommandName: getCommandName
  }
})();


//////////// separate args from options
var _ = require('lodash');

// parse a line into args and options (the first arg is the command)
var parse = function (line) {
  var args = [];
  var options = {};
  var tokens = CommandParser.parse(line, true);
  _.each(tokens, function (x) {
    if (x.charAt(0) === '-') {
      var equalsIdx = x.indexOf('=');
      if (equalsIdx !== -1) {
        options[x.substr(0, equalsIdx)] = x.substr(equalsIdx + 1);
      } else {
        options[x] = '';
      }
    } else {
      args.push(x);
    }

  });
  return [args, options];
};


exports.CommandParser = CommandParser;
exports.parse = parse;
