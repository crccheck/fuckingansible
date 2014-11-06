var parser = require('../src/parser');


exports.testParse = function (test) {
  // trivial case
  test.deepEqual(parser.parse(''), ['']);

  test.deepEqual(parser.parse('a b c'), ['a', 'b', 'c']);

  test.done();
};
