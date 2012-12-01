var CrossWords = require('./crosswords'),
    game = new CrossWords();

if(game.wordsShortCut === false) {
    stdout.write('Type the words that you want to include on crossword game separed by comma: ');
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (words) {
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