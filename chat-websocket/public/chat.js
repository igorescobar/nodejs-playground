$(document).ready(function () {
  var sendBox = $("#sendbox"),
      messageBox = $("#message"),
      messageList = $("#message_list"),
      userName = prompt("Digite seu apelido:","Apelido"),
      clientCounter = $("#client_count");

  var socket = io.connect("http://localhost:8080/");
  messageBox.focus();

  // when a message has been sent
  sendBox.on("submit", function (e) {
    e.preventDefault();

    var messageBoxContent = messageBox.val(),
        messagePackage = {"user": userName, "text": messageBoxContent};

    // sends the message to server
    if(/^ *$/g.test(messageBoxContent) === false ) {
      socket.emit("new_message", messagePackage);
    }
  });

  // when a message arrives from server
  socket.on('broadcast_message', function (data){
    messageList.append("<li>" +  data.user + ": " + data.text + "</li>");
    messageBox.val("");
  });

  // when a generic message event was triggered from server
  socket.on('message', function (data) {
    clientCounter.html(data);
  });


});