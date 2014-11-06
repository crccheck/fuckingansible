var backend = require('../src/fuckinga_backend');


exports.testApt = function (test) {
  var commands = backend.processInput('apt-get install foo');
  test.deepEqual(commands[0], {apt: 'name=foo'});

  commands = backend.processInput('apt-get install foo -y');
  test.deepEqual(commands[0], {apt: 'name=foo'});

  commands = backend.processInput('sudo apt-get install foo');
  test.deepEqual(commands[0], {sudo: 'yes'});
  test.deepEqual(commands[1], {apt: 'name=foo'});
  test.done();
};


exports.testAptRepository = function (test) {
  var commands = backend.processInput('add-apt-repository foo');
  test.deepEqual(commands[0], {apt_repository: "repo='foo'"});
  test.done();
};
