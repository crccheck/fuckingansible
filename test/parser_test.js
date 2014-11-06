var parser = require('../src/parser');


exports.testParse = function (test) {
  // trivial case
  test.deepEqual(parser.parse(''), [[''], {}]);

  test.deepEqual(parser.parse('a b c'), [['a', 'b', 'c'], {}]);

  test.deepEqual(parser.parse('a b c -n'), [['a', 'b', 'c'], {'-n': ''}]);

  test.deepEqual(
    parser.parse('a b c --n=fart'),
    [['a', 'b', 'c'], {'--n': 'fart'}]
  );

  // TODO
    // parser.parse('a b c --n fart'),

  test.done();
};
