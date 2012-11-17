var twitter = require('ntwitter');
var credentials = require('./credentials');

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

t.stream(
    'statuses/filter',
    { track: ['#ruby', '#php', '#dev', '#python', '#javascript', '#nodejs', '#java'] },
    function(stream) {
        stream.on('data', function(tweet) {
            console.log("@" + tweet.user.screen_name + ":", tweet.text);
        });
    }
);