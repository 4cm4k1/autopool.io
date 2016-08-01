var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname, './public/index.html'));
});

var server = app.listen(process.env.PORT || 3000, initServer);

function initServer(){
  var port = server.address().port;
  console.log('Listening on port', port, 'Ctrl-C to kill server');
}
