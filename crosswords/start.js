/*
    Instructions to play:
    -   node start.js
    -   node start.js --noobie
    -   node start.js --words word1,word2,word3,word4
*/

var CrossWords = require('./crosswords'),
    game = new CrossWords();

if(game.wordsShortCut === false) {
    game.stdout.write('Type the words that you want to ' + 
                      'include on crossword game separed by comma: ');
    
    game.stdin.resume();
    game.stdin.setEncoding('utf8');

    game.stdin.on('data', function (words) {
        game.processTypedWords(words);
        process.exit(1);
    }); 

} else {
    game.processTypedWords(process.argv[3]);
}

process.on('exit', function () {
    game.registerWordsOnBoard();
    game.showBoard();
    console.log('Have fun! :)');  
});