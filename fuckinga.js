var $docs = $('#docs');

var setDoc = function (url) {
  $docs.attr('href', url).text(url);
};


var out = document.getElementById('out'), $out = $(out);

var cls = function () {
  $out.html('');
};

var printCmd = function (module, text) {
  out.innerHTML +=  '- ' + module + ': ' + text + '\n';
  if (out.scrollHeight > out.clientHeight) {
    $out.height(out.scrollHeight)
  }
};


var apt = function (shCommand, tokens) {
  var module = 'apt';
  setDoc('http://docs.ansible.com/apt_module.html');
  if (tokens[0] === 'install') {
    _.each(tokens.slice(1), function (x) {
      printCmd(module, 'name=' + x);
    });

  }
};


var processInput = function (shCommand) {
  cls();
  console.log(shCommand);
  // TODO strip and handle sudo
  var tokens = shCommand.split(/\s+/);
  if (tokens[0] === 'apt-get') {
    apt(shCommand, tokens.slice(1));
  }
};


$('#in').on('keyup', function () { processInput(this.value); });
