var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

var clients = [];

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/echo', function(ws, req) {
  clients.push(ws);

  ws.on('message', function(msg) {
    console.log(msg);
    ws.send(`echo ${msg}`);
  });

  ws.on('close', function() {
    // Remove the WebSocket client from the array when disconnected
    clients = clients.filter(client => client !== ws);
  });

  console.log('socket', req.testing);
});


function sendPing() {
  clients.forEach(client => {
    client.send(Date.now());
  });
}

setInterval(sendPing, 1000);

app.listen(3000);