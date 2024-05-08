
import express from 'express'
import expressWs from 'express-ws';
import sequelize from './services/db.js';
import { createModule } from './controllers/ModuleController.js';

var app = express();
var ws = expressWs(app);


//Sync database
sequelize
  .sync()
  .then(() => {
  })
  .catch((err) => {
    console.log(err);
  });

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
    handleMessage(msg)
  });

  ws.on('close', function() {
    // Remove the WebSocket client from the array when disconnected
    clients = clients.filter(client => client !== ws);
  });

});


function handleMessage(msg) {
  
}

function sendPing() {
  clients.forEach(client => {
    client.send(Date.now());
  });
}

setInterval(sendPing, 1000);


app.listen(3000);