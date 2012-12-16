$(function(){

	if(!('getContext' in document.createElement('canvas'))){
		alert('Sorry, it looks like your browser does not support canvas!');
		return false;
	}

	var url = 'http://localhost:8080'
		,	doc = $(document)
		,	win = $(window)
		,	canvas = $('#paper')
		,	ctx = canvas[0].getContext('2d')
		,	instructions = $('#instructions')
		,	id = null
		,	drawing = false
		,	clients = []
		,	cursors = []
		,	socket = io.connect(url)
		,	prev = {};
	
	function handleUsers(data){
		if(data.register_user){
			
			data = data.register_user;
			if(!id) id = data.id
			cursors[data.id] = $('<div class="cursor">').appendTo('#cursors').hide();
			clients[data.id] = data;
			
		} else if(data.unregister_user){

			data = data.unregister_user;
			cursors[data.id].remove();
			delete clients[data.id];
			delete cursors[data.id];

		}
	};

	socket.on('message', function(data){	
		handleUsers(JSON.parse(data));
	});

	socket.on('moving', function (data) {
		if(clients[data.id]){
			cursors[data.id].show().css({ 'left': data.x, 'top': data.y });
		
			if(data.drawing) {		
				drawLine(data.prev_x, data.prev_y, data.x, data.y);
			}
		}	else {
			handleUsers({"register_user": {"id": data.id}});
		}
	});

	canvas.on('mousedown',function(e){
		e.preventDefault();
		drawing = true;
		prev.x = e.pageX;
		prev.y = e.pageY;
		instructions.fadeOut();
	});

	doc.on('mousemove',function(e){
		socket.emit('mousemove',{
			'prev_x': prev.x,
			'prev_y': prev.y,
			'x': e.pageX,
			'y': e.pageY,
			'drawing': drawing,
			'id': id
		});

		if(drawing){
			drawLine(prev.x, prev.y, e.pageX, e.pageY);
			prev.x = e.pageX;
			prev.y = e.pageY;
		}

	});
	
	doc.on('mouseup mouseleave',function(){
		drawing = false;
	});

	function drawLine(fromx, fromy, tox, toy){
		ctx.moveTo(fromx, fromy);
		ctx.lineTo(tox, toy);
		ctx.stroke();
	};

});