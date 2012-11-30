var stdin   = process.stdin, 
    stdout  = process.stdout,
    words   = new Array(),
    crossWordSignal = '*',
    maxWordLength   = 10,
    maxWordSlots    = maxWordLength * 10,
    remainingSlots  = maxWordSlots,
    crossWord;

stdin.resume();
stdin.setEncoding('utf8');

stdout.write('So.. do you want to play crosswords?\n\n\
Start typing the words that you want to include on it: ');


crossWord = function () {
  var crossWordLine = function () {
    for (var i = 1, lineDigit = crossWordSignal; i < maxWordLength; i++){
      lineDigit += crossWordSignal;
    }

    return lineDigit;
  };

  var crossWord = Array(),
      line = crossWordLine();
  
  for(var i = 0; i < maxWordLength; i++){
    crossWord.push(line);
  }

  return crossWord;
}();


var validateWord = function (word) {
  if (word.length > maxWordLength) {
    return {"error": "Sua palavra não pode ser maior do que 10 caracteres.\n"}
  } else if (word.length > remainingSlots) {
    return {"error": "Sua palavra deve ser menor do que o número de slots disponíveis no jogo.\n"}
  } 
  return true;
};

var prepareWord = function (word) {
  return word.toString().trim().replace(/\W+/g, '').toUpperCase();
};

var registerSlots = function (word) {
  return remainingSlots -= word.length;
};

var registerWord = function (word) {
  var word = prepareWord(word),
      validatedWord = validateWord(word);

  if(typeof validatedWord !== "boolean") {
    return stdout.write(validatedWord.error)
  }
  
  registerSlots(word);

  return words.push(word);
};

stdin.on('data', function (word) {
  
  registerWord(word);

  // automaticly exit the program if there's 
  // no open slots left on the game.
  if(remainingSlots <= 0)
    process.exit(1);

});

// 0 = horizontal, 1 = vertical
var verticalDirection = function () {
  Math.floor((Math.random()*2)) == true
};

var searchHorizontalFreeSlot = function (line, word, start) {
  var lineLength = line.length,
      wordLength = word.length

  for(var col = start; col < lineLength; col++){
    if(line[col] === crossWordSignal) break;
    start++
  }

  var end = start;
  for(var col = end; col < lineLength; col++){
    var rangeSize = end - start;
    if (rangeSize === wordLength) break;
    if (line[col] === crossWordSignal) {
      end++
    } else {
      return searchHorizontalFreeSlot(line, word, start + 1);
    }
  }
  return [start,end];
};

process.on('exit', function () {
  var currentWord;
   
   console.log(searchHorizontalFreeSlot('AAAAA***AA', 'TEST', 0));

  // for(i in words){
  //   currenWord = words[i];

  //   for(var line = 0; line < crossWord.length; line++){
  //     console.log(searchHorizontalFreeSlot(crossWord[line], currenWord, 0));
  //   }
  // }
}); 

process.on('SIGINT', function () {
  console.log('Want to see how it looks? Press Control-D :)');
});
