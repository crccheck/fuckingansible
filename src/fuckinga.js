'use strict';

// main
var $ = require('jquery');
var _ = require('lodash');
var backend = require('./fuckinga_backend');

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
var printCmds = function (obj) {
  var text = '';
  var prefix = '- ';
  _.each(obj, function (x) {
    _.each(x, function (v, k) {
      text += prefix + k + ': ' + v + '\n';
    });
    prefix = '  ';
  });
  out.innerHTML = text;
  // adjust textarea height to fit contents
  if (out.scrollHeight > out.clientHeight) {
    $out.height(out.scrollHeight);
  }
};

backend.setDoc = setDoc;  // FIXME

$('#in').on('keyup', function () {
  // TODO only print if output changes
  var commands = backend.processInput(this.value);
  printCmds(commands);
});

$('form').on('submit', function (e) { e.preventDefault(); });
