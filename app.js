var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

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
  ws.on('message', function(msg) {
    console.log(msg);
    ws.send(`echo ${msg}`);
  });
  console.log('socket', req.testing);
});


app.listen(3000);