'use strict';

var _ = require('lodash');
var CommandParser = require('./parser');

// wrapper around parser.js
var parse = function (line) {
  // return line.split(/s+/);
  return CommandParser.parse(line, true);
};


// FIXME
var setDoc = function () {};

var apt = function (shCommand, tokens) {
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
};


var processInput = function (shCommand) {
  var tokens = parse(shCommand.trim());
  var commands = [];
  if (tokens[0] === 'sudo') {
    tokens.shift();
    commands.push({'sudo': 'yes'});
  }
  if (tokens[0] === 'apt-get') {
    tokens.shift();
    commands = commands.concat(apt(shCommand, tokens));
  }
  return commands;
};


exports.parse = parse;
exports.apt = apt;
exports.processInput = processInput;
