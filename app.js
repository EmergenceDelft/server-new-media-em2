
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
  createModule().then(
    console.log("Made new Module")
  )
  console.log("Made a new connection!");

  ws.on('message', function(msg) {
    console.log(msg);
    ws.send(`echo ${msg}`);
  });

  ws.on('close', function() {
    // Remove the WebSocket client from the array when disconnected
    clients = clients.filter(client => client !== ws);
  });

});


app.listen(3000);