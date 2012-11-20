var express = require("express")
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

app.set('view options', {layout: false});
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/*.(js|css)', function(req, res){
  console.log(res);
  res.sendfile("./public" + req.url);
});

app.get('/', function(req, res){
  res.render('index.jade', {});
});

server.listen(8080);

var activeClients = 0;
io.sockets.on('connection', function(client){
  activeClients += 1;
  io.sockets.send(activeClients)
  client.on('disconnect', function(){
    clientDisconnect(client);
  });
});

function clientDisconnect(client){
  activeClients -=1;
 io.sockets.send(activeClients)
}