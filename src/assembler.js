// assemble a data structure to return the text of a command

var assemble = function (input) {
  if (Array.isArray(input)) {
    return input.map(assemble).join(' ');
  } else {
    return input;
  }
};


exports.assemble = assemble;
