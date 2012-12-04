/*
    How to play:
    -   node start.js
    -   node start.js --noobie
    -   node start.js --words word1,word2,word3,word4
*/

var readline = require('readline'),
    CrossWords = require('./crosswords'),
    game = new CrossWords();

if(game.wordsShortCut === false) {
    
    var rl = readline.createInterface(process.stdin, process.stdout);

    rl.question("Type the words that you want to " + 
                "include on crossword game separed by comma: ", function(words) {
     
        game.processTypedWords(words);
        process.exit(1);

        rl.close();
    });
    
} else {
    game.processTypedWords(process.argv[3]);
}

process.on('exit', function () {
    game.registerWordsOnBoard();
    console.log(game.showBoard());
    console.log('Have fun! :)');  
});