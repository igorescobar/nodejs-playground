var jsc = require('jscoverage'),
    assert = require('assert'),
    require = jsc.require(module),
    CrossWords = require('../crosswords.js', true),
    game = new CrossWords();

module.exports = {
  'options.startUpOptions': function () {
    assert.eql([], game.words);
    assert.eql([], game.possiblePositions);
    assert.equal('*', game.crossWordSignal);
    assert.equal(10, game.maxWordLength);
    assert.equal(100, game.maxWordSlots);
    assert.equal(100, game.remainingSlots);
    assert.equal(true, game.prettyPrint);
    assert.equal(false, game.wordsShortCut);
    assert.equal(10, game.crossWord.length);
  },
  'methods.randomArray()': function () {
    assert.notEqual(['word1', 'word2', 'word3', 'word4'], 
                    game.randomArray(['word1', 'word2', 'word3', 'word4']));
  },
  'methods.drawCrossWord()': function () {
    var drawedCrossWord =  game.drawCrossWord();
    assert.equal(10, drawedCrossWord.length);
    drawedCrossWord.forEach(function(drawed){
      assert.equal('**********', drawed);
    }); 
  },
  'methods.prepareWord()': function () {
    assert.equal('ABC', game.prepareWord('abc'));
    assert.equal('ABC', game.prepareWord('a-b-c'));
    assert.equal('ABC', game.prepareWord('a   b    c'));
    assert.equal('BC', game.prepareWord('ábác'));
  },
  'methods.validateWord()': function () {
    assert.equal("Your word 'palavramaiorque10chars' can't be higher than 10 chars.\n",
    game.validateWord('palavramaiorque10chars').error);
    game.remainingSlots = 0;

    assert.equal("The word palavra' wasn't added. No slots available!\n",
    game.validateWord('palavra').error);
    game = new CrossWords(); // reseting classes
  },
  'methods.processTypedWords()': function () {
    game.processTypedWords('yahoo,meme,poker');

    assert.equal(3, game.words.length); 
    assert.equal(86, game.remainingSlots);
  },
  'methods.orderByLength()': function () {
    assert.equal('yahoo', game.orderByLength(['a', 'bc', 'yahoo'])[0]); 
  },
  'methods.registerWord()': function () {
    game = new CrossWords();

    assert.deepEqual(['SMALL'], game.registerWord('small'));
    assert.deepEqual("Your word 'SUPERBIGWORD' can't be higher than 10 chars.\n", game.registerWord('superbigword'));
  },
  'methods.registerWordsOnBoard().smallWords': function () {
    game = new CrossWords();
    game.randomPositions = false;

    game.processTypedWords('yahoo,meme,poker');
    game.registerWordsOnBoard();

    assert.deepEqual(['POKER', 'YAHOO', 'MEME'], game.words);
    assert.deepEqual(
      ["POKERYAHOO",
       "MEME******",
       "**********",
       "**********",
       "**********",
       "**********",
       "**********",
       "**********",
       "**********",
       "**********"], game.crossWord);
    console.log(game.possiblePositions);
    assert.eql(
      [ { direction: 'h', position: 1, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 1, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 1, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'h', position: 1, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'h', position: 1, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'h', position: 1, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'h', position: 1, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'h', position: 1, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'h', position: 2, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 2, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 2, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'h', position: 2, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'h', position: 2, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'h', position: 2, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'h', position: 2, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'h', position: 2, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'h', position: 3, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 3, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 3, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'h', position: 3, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'h', position: 3, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'h', position: 3, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'h', position: 3, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'h', position: 3, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'h', position: 4, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 4, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 4, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'h', position: 4, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'h', position: 4, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'h', position: 4, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'h', position: 4, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'h', position: 4, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'h', position: 5, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 5, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 5, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'h', position: 5, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'h', position: 5, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'h', position: 5, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'h', position: 5, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'h', position: 5, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'h', position: 6, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 6, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 6, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'h', position: 6, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'h', position: 6, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'h', position: 6, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'h', position: 6, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'h', position: 6, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'h', position: 7, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 7, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 7, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'h', position: 7, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'h', position: 7, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'h', position: 7, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'h', position: 7, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'h', position: 7, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'h', position: 8, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 8, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 8, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'h', position: 8, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'h', position: 8, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'h', position: 8, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'h', position: 8, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'h', position: 8, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'h', position: 9, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 9, word: 'MEME', coord: [ 0, 4 ] },
        { direction: 'h', position: 9, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'h', position: 9, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'h', position: 9, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'h', position: 9, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'h', position: 9, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'h', position: 9, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 0, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 0, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 0, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 0, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 0, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 0, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 0, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 0, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 1, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 1, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 1, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 1, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 1, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 1, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 1, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 1, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 2, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 2, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 2, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 2, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 2, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 2, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 2, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 2, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 3, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 3, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 3, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 3, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 3, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 3, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 3, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 3, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 4, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 4, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 4, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 4, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 4, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 4, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 4, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 4, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 5, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 5, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 5, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 5, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 5, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 5, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 5, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 5, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 6, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 6, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 6, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 6, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 6, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 6, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 6, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 6, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 7, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 7, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 7, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 7, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 7, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 7, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 7, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 7, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 8, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 8, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 8, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 8, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 8, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 8, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 8, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 8, word: 'MEME', coord: [ 6, 10 ] },
        { direction: 'v', position: 9, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 9, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 9, word: 'MEME', coord: [ 1, 5 ] },
        { direction: 'v', position: 9, word: 'MEME', coord: [ 2, 6 ] },
        { direction: 'v', position: 9, word: 'MEME', coord: [ 3, 7 ] },
        { direction: 'v', position: 9, word: 'MEME', coord: [ 4, 8 ] },
        { direction: 'v', position: 9, word: 'MEME', coord: [ 5, 9 ] },
        { direction: 'v', position: 9, word: 'MEME', coord: [ 6, 10 ] } ]
      , game.possiblePositions)
  },
  'methods.registerWordsOnBoard().biggerWords': function () {
    game = new CrossWords();
    game.randomPositions = false;

    game.processTypedWords('felicidade,geladeiras,pernambuco,camilinhas,respondera,comunidade,institutos,curriculos,dicionario');
    game.registerWordsOnBoard();

    assert.deepEqual(["DICIONARIO","CURRICULOS",
                      "INSTITUTOS","COMUNIDADE",
                      "RESPONDERA","CAMILINHAS",
                      "PERNAMBUCO","GELADEIRAS",
                      "FELICIDADE"], game.words);

    assert.deepEqual(
      ["DICIONARIO",
       "CURRICULOS",
       "INSTITUTOS",
       "COMUNIDADE",
       "RESPONDERA",
       "CAMILINHAS",
       "PERNAMBUCO",
       "GELADEIRAS",
       "FELICIDADE",
       "**********"], game.crossWord);
  },
  'methods.showBoard().noRandomPositionsPlusNoobieMode': function () {
    game = new CrossWords();
    game.prettyPrint = false;
    game.randomPositions = false;
    game.processTypedWords('yahoo,meme,poker');
    game.registerWordsOnBoard();
    assert.deepEqual(
      'P O K E R Y A H O O \n' + 
      'M E M E * * * * * * \n' + 
      '* * * * * * * * * * \n' + 
      '* * * * * * * * * * \n' + 
      '* * * * * * * * * * \n' + 
      '* * * * * * * * * * \n' + 
      '* * * * * * * * * * \n' + 
      '* * * * * * * * * * \n' + 
      '* * * * * * * * * * \n' + 
      '* * * * * * * * * * ', game.showBoard());
  },
  'methods.showBoard()': function () {
    game = new CrossWords();
    game.processTypedWords('yahoo,meme,poker');
    game.registerWordsOnBoard();
    assert.deepEqual(209, game.showBoard().length);
  }
};

process.on('exit',function(){
   jsc.coverage();
});