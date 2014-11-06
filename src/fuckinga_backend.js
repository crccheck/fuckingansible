'use strict';

var _ = require('lodash');
var parser = require('./parser');


// FIXME
var setDoc = function () {};


// map possible commands to the ansible module responsible
var commandsToModule = {
  'apt-get': 'apt',
  'add-apt-repository': 'apt_repository',
  'pip': 'pip',
};


var ansibleModules = {
  apt: function (shCommand, tokens) {
    setDoc('http://docs.ansible.com/apt_module.html');
    var commands = [];
    switch (tokens[0]) {
      case 'install':
        tokens.shift();
        _.each(tokens, function (x) {
          commands.push({'apt': 'name=' + x});
        });
      break;
      case 'remove':
        tokens.shift();
        _.each(tokens, function (x) {
          commands.push({'apt': 'name=' + x + ' state=absent'});
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
  },
  pip: function (shCommand, tokens, options) {
    setDoc('http://docs.ansible.com/pip_module.html');
    var commands = [];
    if (tokens[0] === 'install') {
      tokens.shift();
      _.each(tokens, function (x) {
        var bits = x.split('==');
        if (bits.length === 2) {
          commands.push({'pip': 'name=' + bits[0] + ' version=' + bits[1]});
        } else {
          if ('-U' in options || '--upgrade' in options) {
            commands.push({'pip': 'name=' + bits[0] + ' state=latest'});
          } else {
            commands.push({'pip': 'name=' + bits[0]});
          }
        }
      });
    } else if (tokens[0] === 'uninstall') {
      tokens.shift();
      _.each(tokens, function (x) {
        commands.push({'pip': 'name=' + x + ' state=absent'});
      });
    }
    return commands;
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
