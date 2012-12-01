var assert = require('assert'),
    CrossWords = require('../crosswords.js'),
    game = new CrossWords();

module.exports = {
  'options.startUpOptions': function () {
    assert.equal('object', typeof game.stdin);
    assert.equal('object', typeof game.stdout);
    assert.eql([], game.words);
    assert.equal('*', game.crossWordSignal);
    assert.equal(10, game.maxWordLength);
    assert.equal(100, game.maxWordSlots);
    assert.equal(100, game.remainingSlots);
    assert.equal(true, game.prettyPrint);
    assert.equal(false, game.wordsShortCut);
    assert.equal(10, game.crossWord.length);
  },
  'methods.drawCrossWord()': function(){
    var drawedCrossWord =  game.drawCrossWord();
    assert.equal(10, drawedCrossWord.length);
    drawedCrossWord.forEach(function(drawed){
      assert.equal('**********', drawed);
    }); 
  },
  'methods.prepareWord()': function(){
    assert.equal('ABC', game.prepareWord('abc'));
    assert.equal('ABC', game.prepareWord('a-b-c'));
    assert.equal('ABC', game.prepareWord('a   b    c'));
    assert.equal('BC', game.prepareWord('ábác'));
  },
  'methods.validateWord()': function(){
    assert.equal("Your word 'palavramaiorque10chars' can't be higher than 10 chars.\n",
    game.validateWord('palavramaiorque10chars').error);
    game.remainingSlots = 0;

    assert.equal("The word palavra' wasn't added. No slots available!\n",
    game.validateWord('palavra').error);
    game = new CrossWords(); // reseting classes
  },
  'methods.processTypedWords()': function(){
    var words = 'yahoo,meme,poker';
    game.processTypedWords(words);

    assert.equal(3, game.words.length); 
    assert.equal(86, game.remainingSlots);
  }
};