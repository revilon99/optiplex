var app = require('http').createServer(handler)
var fs = require('fs');

var args = process.argv.slice(2);
app.listen(args[0]);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}