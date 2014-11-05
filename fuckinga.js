var $ = require('jquery');
var _ = require('lodash');
var backend = require('./fuckinga_backend');

var $docs = $('#docs');

var setDoc = function (url) {
  $docs.attr('href', url).text(url);
};

var out = document.getElementById('out'), $out = $(out);

var cls = function () {
  $out.html('');
};

var printCmd = function (text) {
  out.innerHTML += text + '\n';
  if (out.scrollHeight > out.clientHeight) {
    $out.height(out.scrollHeight)
  }
};

backend.setDoc = setDoc;
$('#in').on('keyup', function () {
  // TODO only cls if output changes
  cls();
  var commands = backend.processInput(this.value);
  _.each(commands, printCmd);
});

$('form').on('submit', function (e) { e.preventDefault(); });
