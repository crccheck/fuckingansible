var backend = require('../src/fuckinga_backend');


exports.testSomething = function(test){
  var commands = backend.processInput('apt-get install foo');
  test.equal(commands[0], 'apt: name=foo')

  var commands = backend.processInput('sudo apt-get install foo');
  test.equal(commands[0], 'sudo: yes')
  test.equal(commands[1], 'apt: name=foo')
  test.done();
};
