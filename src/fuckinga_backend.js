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
  var parser_out = parser.parse(shCommand.trim());
  var args = parser_out[0];
  var options = parser_out[1];
  var commands = [];
  if (args[0] === 'sudo') {
    args.shift();
    commands.push({'sudo': 'yes'});
  }
  var module = ansibleModules[commandsToModule[args[0]]];
  if (module) {
    args.shift();
    commands = commands.concat(module(shCommand, args, options));
  }
  return commands;
};


exports.processInput = processInput;
