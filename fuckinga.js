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
  switch (tokens[0]) {
    case 'install':
      tokens.shift();
      _.each(tokens, function (x) {
        if (x[0] != '-') {
          printCmd(module, 'name=' + x);
        }
      });
    break;
    case 'remove':
      tokens.shift();
      _.each(tokens, function (x) {
        if (x[0] != '-') {
          printCmd(module, 'name=' + x + ' state=absent');
        }
      });
    break;
  }
};


var processInput = function (shCommand) {
  cls();
  console.log(shCommand);
  // TODO strip and handle sudo
  var tokens = shCommand.trim().split(/\s+/);
  if (tokens[0] === 'apt-get') {
    tokens.shift();
    apt(shCommand, tokens);
  }
};


$('#in').on('keyup', function () { processInput(this.value); });
