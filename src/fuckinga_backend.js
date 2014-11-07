'use strict';

var _ = require('lodash');
var parser = require('./parser');


var commandPlaybooks = {
  'apt-get': function (shCommand, tokens) {
    var commands = [{'_doc': 'http://docs.ansible.com/apt_module.html'}];
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
  'add-apt-repository': function (shCommand, tokens) {
    var commands = [{'_doc': 'http://docs.ansible.com/apt_repository_module.html'}];
    commands.push({
      apt_repository: "repo='" + tokens[0] + "'"
    });
    return commands;
  },
  'apt-key': function (shCommand, tokens, options) {
    var commands = [{'_doc': 'http://docs.ansible.com/apt_key_module.html'}];
    commands.push({
      apt_key: 'keyserver=' + options['--keyserver'] + ' id=' + options['--recv-keys']
    });
    return commands;
  },
  mkdir: function (shCommand, args) {
    var commands = [{'_doc': 'http://docs.ansible.com/file_module.html'}];
    commands.push({
      file: 'path=' + (args[0] || '?') + ' state=directory'
    });
    return commands;
  },
  npm: function (shCommand, tokens, options) {
    var commands = [{'_doc': 'http://docs.ansible.com/npm_module.html'}];
    if (tokens[0] === 'install') {
      tokens.shift();
      _.each(tokens, function (x) {
        if ('-g' in options || '--global' in options) {
          commands.push({'npm': 'name=' + x + ' global=yes'});
        } else {
          commands.push({'npm': 'name=' + x});
        }
      });
    }
    return commands;
  },
  pip: function (shCommand, tokens, options) {
    var commands = [{'_doc': 'http://docs.ansible.com/pip_module.html'}];
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
  },
  service: function (shCommand, tokens) {
    var commands = [{'_doc': 'http://docs.ansible.com/service_module.html'}];
    var state = tokens[1], stated;
    // guess the past tense of the state
    if (state === 'stop') {
      stated = 'stopped';
    } else if (state) {
      stated = state + 'ed';
    } else {
      stated = '?';
    }
    commands.push({'service': 'name=' + (tokens[0] || '?') + ' state=' + stated});
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
  var ansibleModuleName = args[0];
  var module = commandPlaybooks[ansibleModuleName];
  if (module) {
    args.shift();
    commands = commands.concat(module(shCommand, args, options));
  }
  return commands;
};


exports.processInput = processInput;
