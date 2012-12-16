var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, static = require('node-static')
	,	fileServer = new static.Server('./');

app.listen(8080);

function handler(request, response) {
	request.addListener('end', function () {
 		fileServer.serve(request, response);
  });
}

io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	var currentIdPackage  = {"id": socket.id};

	io.sockets.send(JSON.stringify({"register_user": currentIdPackage}));

	socket.on('mousemove', function (data) {
		socket.broadcast.emit('moving', data);
	});

	socket.on('disconnect', function(){
		io.sockets.send(JSON.stringify({"unregister_user": currentIdPackage}));
	});

});