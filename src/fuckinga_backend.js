'use strict';

var _ = require('lodash');
var parser = require('./parser');


// FIXME
var setDoc = function () {};


// map possible commands to the ansible module responsible
var commandsToModule = {
  'apt-get': 'apt',
  'add-apt-repository': 'apt_repository'
};


var ansibleModules = {
  apt: function (shCommand, tokens) {
    setDoc('http://docs.ansible.com/apt_module.html');
    var commands = [];
    switch (tokens[0]) {
      case 'install':
        tokens.shift();
        _.each(tokens, function (x) {
          if (x[0] != '-') {
            commands.push({'apt': 'name=' + x});
          }
        });
      break;
      case 'remove':
        tokens.shift();
        _.each(tokens, function (x) {
          if (x[0] != '-') {
            commands.push({'apt': 'name=' + x + ' state=absent'});
          }
        });
      break;
    }
    return commands;
  },
  apt_repository: function (shCommand, tokens) {
    setDoc('http://docs.ansible.com/apt_repository_module.html');
    return {
      apt_repository: "repo='" + tokens[0] + "'"
    };
  }
};


var processInput = function (shCommand) {
  var tokens = parser.parse(shCommand.trim());
  var commands = [];
  if (tokens[0] === 'sudo') {
    tokens.shift();
    commands.push({'sudo': 'yes'});
  }
  var module = ansibleModules[commandsToModule[tokens[0]]];
  if (module) {
    tokens.shift();
    commands = commands.concat(module(shCommand, tokens));
  }
  return commands;
};


exports.processInput = processInput;
