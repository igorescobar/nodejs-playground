var http = require("http"),
    sys = require("sys"),
    url = require("url"),
    path = require("path"), 
    events = require("events"),
    fs = require("fs"),
    tweet_emitter = new events.EventEmitter();

function load_static_file(uri, response) {
  var filename = path.join(process.cwd(), uri);
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
};

function get_tweets() {
  var twitter_search = url.parse("http://search.twitter.com/search.json?q=html&rpp=5&include_entities=true&result_type=mixed");

  var request = http.request(twitter_search, function(res){    
    var body = ""; 
    res.on("data", function(data){
      console.log(data);
      body += data;
    });
    res.on("end", function(){
      var tweets = JSON.parse(body).results;
      if(tweets.length > 0) {
        tweet_emitter.emit("tweets", tweets);
      }
    });
  });

  request.end();
};


http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    if(uri === "/stream") {
      var listener = tweet_emitter.on("tweets", function(tweets) {
        response.writeHead(200, { "Content-Type" : "text/plain" });
        response.write(JSON.stringify(tweets));
        response.end();
        clearTimeout(timeout);
      });
      var timeout = setTimeout(function() {
        response.writeHead(200, { "Content-Type" : "text/plain" });
        response.write(JSON.stringify([]));
        response.end();
        tweet_emitter.removeAllListeners("tweets");
      }, 3000);
    }
    else {
      load_static_file(uri, response);
    }
}).listen(8080);
sys.puts("Server running at http://localhost:8080/");


setInterval(get_tweets, 2000);