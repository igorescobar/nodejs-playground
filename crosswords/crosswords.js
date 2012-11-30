var stdin   = process.stdin, 
    stdout  = process.stdout,
    words   = [],
    crossWordSignal = '*',
    maxWordLength   = 10,
    maxWordSlots    = maxWordLength * 10,
    remainingSlots  = maxWordSlots,
    crossWord;

stdin.resume();
stdin.setEncoding('utf8');

stdout.write('So.. do you want to play crosswords?\n\n\
Start typing the words that you want to include on it: ');

// empty crossword board
var crossWord = function () {
  var crossWordLine = function () {
    for (var i = 1, lineDigit = crossWordSignal; i < maxWordLength; i++){
      lineDigit += crossWordSignal;
    }

    return lineDigit;
  };

  var crossWord = [], line = crossWordLine();
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

var registerWordOnBoard = function (){
  var currentWord,
      coords = [],
      direction = 'v';
  
  for (i in words) {
    currentWord = words[i];
    
    for (var col = 0; col < crossWord.length; col++) {
      boardLine = direction === 'v' ? getColumn(col) : crossWord[col];
      
      var directions = {word: currentWord, 'direction': direction, 'position': col, 'coord': searchFreeSlot(boardLine, currentWord, 0)};
      
      if(directions.coord[0] !== directions.coord[1] && (directions.coord[1] - directions.coord[0]) === currentWord.length) {
        direction = (direction === 'v') ? 'h' : 'v';
        coords.push(directions);
        processDirections(directions);
        break;
      }
    }
  }
};

var showBoard = function() {
  console.log(crossWord.join('\n'));
};

stdin.on('data', function (word) {
  registerWord(word);

  if(remainingSlots <= 0)
    process.exit(1);

});

var searchFreeSlot = function (line, word, start) {
  var lineLength = line.length,
      wordLength = word.length;

  for(var col = start; col < lineLength; col++){
    if(line[col] === crossWordSignal || line[col] === word[col]) break;
    start++
  }

  var end = start;

  for(var col = end; col < lineLength; col++){
    var rangeSize = end - start;
    if (rangeSize == wordLength) break;
    if (line[col] === crossWordSignal || line[col] === word[col]) {
      end++
    } else {
      return searchFreeSlot(line, word, start + 1);
    }
  }
  
  return [start, end];
};

var getColumn = function (col) {
  var line = [];
  for(var l = 0; l < crossWord.length; l++)
    line.push(crossWord[l][col]);
  
  return line.join('');
};

var processDirections = function (directions) {
  var setCharAt = function (str, index, chr) {
    if(index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
  };

  for(var i = directions.coord[0], w = 0; i < directions.coord[1]; i++) {
    if (directions.direction === 'h') {
      crossWord[directions.position] = setCharAt(crossWord[directions.position], i, directions.word[w]);
    } else {
      crossWord[i] = setCharAt(crossWord[i], directions.position, directions.word[w]);
    }
    w++;
  }
};

process.on('exit', function () {
  registerWordOnBoard();
  showBoard();
  console.log('Have fun! :)');  
}); 

process.on('SIGINT', function () {
  console.log('Want to see how it looks? Press Control-D :)');
});
