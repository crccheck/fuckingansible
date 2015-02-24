var assemble = require('../src/assembler').assemble;


exports.testAssembleStringTrivial = function (test) {
  test.equal(assemble(''), '');

  test.done();
};

exports.testAssembleString = function (test) {
  test.equal(assemble('foo'), 'foo');

  test.done();
};

exports.testAssembleArrayTrivial = function (test) {
  test.equal(assemble([]), '');

  test.done();
};

exports.testAssembleArray = function (test) {
  test.equal(assemble(['foo']), 'foo');
  test.equal(assemble(['foo', 'bar']), 'foo bar');

  test.done();
};
