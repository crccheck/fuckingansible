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

exports.testPip = function (test) {
  var commands = backend.processInput('pip install foo');
  test.deepEqual(commands[0], {pip: "name=foo"});

  commands = backend.processInput('pip install foo bar');
  test.deepEqual(commands[0], {pip: "name=foo"});
  test.deepEqual(commands[1], {pip: "name=bar"});

  commands = backend.processInput('pip install foo bar==3.2.1');
  test.deepEqual(commands[0], {pip: "name=foo"});
  test.deepEqual(commands[1], {pip: "name=bar version=3.2.1"});

  commands = backend.processInput('pip uninstall foo');
  test.deepEqual(commands[0], {pip: "name=foo state=absent"});

  commands = backend.processInput('pip uninstall foo bar');
  test.deepEqual(commands[0], {pip: "name=foo state=absent"});
  test.deepEqual(commands[1], {pip: "name=bar state=absent"});
  test.done();
};
