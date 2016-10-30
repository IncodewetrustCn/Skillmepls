var http = require('http');
var static = require('node-static');
var file = new static.Server('.');
var morgan = require('morgan');
http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(5000);

console.log('Server running on port 5000');