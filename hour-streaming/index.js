var sys = require('sys'),
http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    sys.puts('Starting sending time');
    setInterval(function(){
        var currentTime = new Date();
        res.write(
            currentTime.getHours()
            + ':' +
            currentTime.getMinutes()
            + ':' +
            currentTime.getSeconds() + "\n"
        );

        setTimeout(function() {
            res.end();
        }, 10000);

    },1000);
}).listen(8080);