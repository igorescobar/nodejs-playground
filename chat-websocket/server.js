var express = require("express"), 
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

app.set('view options', {layout: false});
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index.jade', {});
});

server.listen(8080);

var activeClients = 0;
io.sockets.on('connection', function (client) {

  // triggers message event
  io.sockets.send(activeClients += 1);

  client.on('new_message', function (data) {
    io.sockets.emit("broadcast_message", data);
  });

  client.on('disconnect', function () {
    io.sockets.send(activeClients -= 1);
  });
});