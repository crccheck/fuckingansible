var _ = require('lodash');
var backend = require('../src/fuckinga_backend');

// The backend will insert special commands to tell the frontend to link to the
// docs. Strip them for the tests.
var processInput = function (line) {
  var commands = backend.processInput(line);
  return _.reject(commands, function (x) { return '_doc' in x; });
};


exports.testDocs = function (test) {
  var commands = backend.processInput('apt-get install foo');
  test.deepEqual(commands[0], {_doc: 'http://docs.ansible.com/apt_module.html'});
  test.done();
};

exports.testApt = function (test) {
  var commands = processInput('apt-get install foo');
  test.deepEqual(commands[0], {apt: 'name=foo'});

  commands = processInput('apt-get install foo -y');
  test.deepEqual(commands[0], {apt: 'name=foo'});

  commands = processInput('apt-get remove foo');
  test.deepEqual(commands[0], {apt: 'name=foo state=absent'});

  commands = processInput('sudo apt-get install foo');
  test.deepEqual(commands[0], {sudo: 'yes'});
  test.deepEqual(commands[1], {apt: 'name=foo'});
  test.done();
};


exports.testAptRepository = function (test) {
  var commands = processInput('add-apt-repository foo');
  test.deepEqual(commands[0], {apt_repository: "repo='foo'"});
  test.done();
};


exports.testAptKey = function (test) {
  var commands = processInput(
    'apt-key adv --keyserver=hkp://keyserver.ubuntu.com:80 --recv-keys=1337'
  );
  test.deepEqual(commands[0], {
    apt_key: "keyserver=hkp://keyserver.ubuntu.com:80 id=1337"});
  test.done();
};


exports.testNpm = function (test) {
  var commands = processInput('npm install foo');
  test.deepEqual(commands[0], {npm: "name=foo"});

  commands = processInput('npm install -g foo');
  test.deepEqual(commands[0], {npm: "name=foo global=yes"});

  commands = processInput('npm install --global foo');
  test.deepEqual(commands[0], {npm: "name=foo global=yes"});
  test.done();
};


exports.testPip = function (test) {
  var commands = processInput('pip install foo');
  test.deepEqual(commands[0], {pip: "name=foo"});

  commands = processInput('pip install foo bar');
  test.deepEqual(commands[0], {pip: "name=foo"});
  test.deepEqual(commands[1], {pip: "name=bar"});

  commands = processInput('pip install foo bar==3.2.1');
  test.deepEqual(commands[0], {pip: "name=foo"});
  test.deepEqual(commands[1], {pip: "name=bar version=3.2.1"});

  commands = processInput('pip install -U foo');
  test.deepEqual(commands[0], {pip: "name=foo state=latest"});

  commands = processInput('pip uninstall foo');
  test.deepEqual(commands[0], {pip: "name=foo state=absent"});

  commands = processInput('pip uninstall foo bar');
  test.deepEqual(commands[0], {pip: "name=foo state=absent"});
  test.deepEqual(commands[1], {pip: "name=bar state=absent"});
  test.done();
};

