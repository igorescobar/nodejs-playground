var stdin = process.stdin,
    stdout = process.stdout,
    words = [],
    crossWordSignal = '*',
    maxWordLength = 10,
    maxWordSlots = maxWordLength * 10,
    remainingSlots = maxWordSlots,
    prettyPrint = process.argv[2] !== "--noobie",
    wordsShortCut = process.argv[2] === "--words",
    crossWord;

// empty crossword board
var crossWord = function () {
    var crossWordLine = function () {
        for (var i = 1, lineDigit = crossWordSignal; i < maxWordLength; i++)
            lineDigit += crossWordSignal;

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
        return {"error": "Your word '" + word + "' can't be higher than 10 chars.\n"}
    } else if (word.length > remainingSlots) {
        return {"error": "The word " + word + "' wasn't added. No slots available!\n"}
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

    if (typeof validatedWord !== "boolean") {
        return stdout.write(validatedWord.error)
    }

    registerSlots(word);

    return words.push(word);
};

var registerWordsOnBoard = function (){

    var randomStart = function () {
        return Math.floor((Math.random()*9));
    },
    getColumn = function (col) {
        var line = [];
        for(var l = 0; l < crossWord.length; l++)
            line.push(crossWord[l][col]);

        return line.join('');
    },
    searchFreeSlot = function (line, word, start) {
        var lineLength = line.length,
            wordLength = word.length;

        for (var col = start; col < lineLength; col++) {
            if(line[col] === crossWordSignal || line[col] === word[col]) break;
            start++
        }

        var end = start;

        for (var col = end; col < lineLength; col++) {
            var rangeSize = end - start;
            if (rangeSize == wordLength) break;
            if (line[col] === crossWordSignal || line[col] === word[col]) {
                end++
            } else {
                return searchFreeSlot(line, word, start + 1);
            }
        }

        return [start, end];
    },
    processDirections = function (directions) {
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
    },
    currentWord,
    coords = [],
    direction = 'v';

    for (i in words) {
        currentWord = words[i];

        for (var col = randomStart(); col < crossWord.length; col++) {
            boardLine = direction === 'v' ? getColumn(col) : crossWord[col];

            var directions = {'word': currentWord, 'direction': direction, 
                             'position': col, 'coord': searchFreeSlot(boardLine, currentWord, 0)};

            if(directions.coord[0] !== directions.coord[1] && 
              (directions.coord[1] - directions.coord[0]) === currentWord.length) {
                direction = (direction === 'v') ? 'h' : 'v';
                coords.push(directions);
                processDirections(directions);
                break;
            }
        }
    }
};

var showBoard = function() {
    var randomLetter = function () {
    return Math.random().toString(36)
           .substr(2,16).replace(/\d/g, '')[0]
           .toUpperCase();
    };

    var applyLayout = function () {
        var spacedCrossWord = crossWord.join('\n').replace(/([A-Z0-9*])/g, function ($0) { 
            return $0 + " "; 
        });

        if(prettyPrint === true) {
            return spacedCrossWord.replace(/\*/g, function ($0) {
                return randomLetter();
            });
        }

        return spacedCrossWord;
    };

    console.log(applyLayout());
};

// program init();
var processTypedWords = function(words) {
    var words = words.split(',').sort(function() { 
        return 0.5 - Math.random();
    });
  
    words.forEach(function(word) { 
        registerWord(word);
    });
}; 

if(wordsShortCut === false) {
    stdout.write('Type the words that you want to include on crossword game separed by comma: ');
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (words) {
        processTypedWords(words);
        process.exit(1);
    }); 
} else {
    processTypedWords(process.argv[3]);
}

process.on('exit', function () {
    registerWordsOnBoard();
    showBoard();
    console.log('Have fun! :)');  
}); 