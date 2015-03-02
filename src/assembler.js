'use strict';

// assemble a data structure to return the text of a command
//
// Makes it easier to construct a complicated command to remove having to deal
// with string interpolation.
var assemble = function (input) {
  if (Array.isArray(input)) {
    return input.map(assemble).join(' ');
  } else if (typeof input === 'object') {  // XXX isn't everything an object?
    var newInput = [];
    for (var key in input) { if (input.hasOwnProperty(key)) {
      newInput.push(key + '=' + input[key]);  // TODO quote
    }}
    return assemble(newInput);
  }
  return input;
};


exports.assemble = assemble;
