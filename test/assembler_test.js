var assemble = require('../src/assembler').assemble;


exports.testAssemblerTrivial = function (test) {
  test.equal(assemble(''), '');

  test.done();
};

exports.testAssemblerString = function (test) {
  test.equal(assemble('foo'), 'foo');

  test.done();
};
