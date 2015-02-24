var assemble = require('../src/assembler').assemble;


exports.testAssembleString = function (test) {
  test.equal(assemble(''), '');  // trivial case
  test.equal(assemble('foo'), 'foo');

  test.done();
};

exports.testAssembleArray = function (test) {
  test.equal(assemble([]), '');  // trivial case
  test.equal(assemble(['foo=bar']), 'foo=bar');
  test.equal(assemble(['foo=bar', 'cake=nice']), 'foo=bar cake=nice');

  test.done();
};

exports.testAssembleObj = function (test) {
  test.equal(assemble({}), '');
  test.equal(assemble({foo: 'bar'}), 'foo=bar');
  // Is the order of a dict guaranteed?
  test.equal(assemble({foo: 'bar', cake: 'nice'}), 'foo=bar cake=nice');

  test.done();
};
