function msgReceived(msg){
  $clientCounter.html(msg);
}

$(document).ready(function () {
  $clientCounter = $("#client_count")

  var socket = io.connect("http://localhost:8080");
  socket.on('message', function(msg){
    console.log(msg);
    msgReceived(msg)
  });
});