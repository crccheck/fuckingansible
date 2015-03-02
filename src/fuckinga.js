'use strict';

// main
var $ = require('jquery');
var _ = require('lodash');
var backend = require('./fuckinga_backend');
var assemble = require('./assembler').assemble;

var $docs = $('#docs');

var setDoc = function (url) {
  $docs.attr('href', url).text(url);
};

var out = document.getElementById('out'), $out = $(out);

// output the obj as YAML
//
// The node packages for dealing with YAML seem like too much for this
// application, but maybe switch to one of those once I figure out which one of
// the 60 yaml packages works.
var printCmds = function (commands) {
  var textBits = [];
  var prefix = '- ';
  var isDoc = function (x) { return '_doc' in x; };
  var justCommands = _.reject(commands, isDoc);
  var justDocs = _.filter(commands, isDoc);
  // display `justCommands` as YAML
  _.each(justCommands, function (x) {
    _.each(x, function (v, k) {
      textBits.push(prefix + k + ': ' + assemble(v));
    });
    prefix = '  ';
  });
  out.innerHTML = textBits.join('\n');

  $out.height(0).height(out.scrollHeight);
  $docs.empty();
  _.each(justDocs, function (x) {
    // may need to run this through `_.uniq`
    _.each(x, function (v) {
      $docs.append('<li><a href="' + v + '" target="ansibleDocs">' + v + '</a></li>');
    });
  });
};

backend.setDoc = setDoc;  // FIXME

$('#in').on('keyup', function () {
  // TODO only print if output changes
  var commands = backend.processInput(this.value);
  printCmds(commands);
});

$('form').on('submit', function (e) { e.preventDefault(); });


// live samples
$('.samples code').on('click', function () {
  $('#in').val(this.innerHTML.replace('&gt;', '>')).trigger('keyup');
});
