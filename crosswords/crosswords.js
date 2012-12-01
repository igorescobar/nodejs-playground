// Constructor
var CrossWords = function() {
    this.crossWord = this.drawCrossWord();
    this.maxWordSlots = this.maxWordLength * 10;
    this.remainingSlots = this.maxWordSlots;
};

// properties and methods
CrossWords.prototype = {
    stdin: process.stdin,
    stdout: process.stdout,
    words: [],
    crossWordSignal: '*',
    maxWordLength: 10,
    maxWordSlots: 0,
    remainingSlots: 0,
    prettyPrint: process.argv[2] !== "--noobie",
    wordsShortCut: process.argv[2] === "--words",
    crossWord: {},
    drawCrossWord: function () {

        var crossWordLine = function (_) {
            for (var i = 1, lineDigit = _.crossWordSignal; i < _.maxWordLength; i++)
                lineDigit += _.crossWordSignal;

            return lineDigit;
        };

        var crossWord = [], line = crossWordLine(this);
        for(var i = 0; i < this.maxWordLength; i++){
            crossWord.push(line);
        }

      return crossWord;
    },
    prepareWord: function (word) {
        return word.toString().trim().replace(/\W+/g, '').toUpperCase();
    },
    validateWord: function (word) {
        if (word.length > this.maxWordLength) {
            return {"error": "Your word '" + word + "' can't be higher than 10 chars.\n"}
        } else if (word.length > this.remainingSlots) {
            return {"error": "The word " + word + "' wasn't added. No slots available!\n"}
        } 

        return true;
    },
    registerWord: function (word) {
        var word = this.prepareWord(word),
            validatedWord = this.validateWord(word);

        if (typeof validatedWord !== "boolean") {
            return this.stdout.write(validatedWord.error)
        }

        this.registerSlots(word);

        return this.words.push(word);
    },
    processTypedWords: function (words) {
        var _ = this, words = words.split(',').sort(function() { 
            return 0.5 - Math.random();
        });
        
        words.forEach(function(word) { 
            _.registerWord(word);
        });
    },
    registerSlots: function (word) {
        return this.remainingSlots -= word.length;
    },
    registerWordsOnBoard: function () {
        var _ = this, 
        randomStart = function () {
            return Math.floor((Math.random()*9));
        },
        getColumn = function (col) {
            var line = [];
            for(var l = 0; l < _.crossWord.length; l++)
                line.push(_.crossWord[l][col]);

            return line.join('');
        },
        searchFreeSlot = function (line, word, start) {
            var lineLength = line.length,
                wordLength = word.length;

            for (var col = start; col < lineLength; col++) {
                if(line[col] === _.crossWordSignal || line[col] === word[col]) break;
                start++
            }

            var end = start;

            for (var col = end; col < lineLength; col++) {
                var rangeSize = end - start;
                if (rangeSize == wordLength) break;
                if (line[col] === _.crossWordSignal || line[col] === word[col]) {
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
                    _.crossWord[directions.position] = setCharAt(_.crossWord[directions.position], i, directions.word[w]);
                } else {
                    _.crossWord[i] = setCharAt(_.crossWord[i], directions.position, directions.word[w]);
                }

                w++;
            }
        },
        currentWord,
        coords = [],
        direction = 'v';

        for (i in this.words) {
            currentWord = this.words[i];
            for (var col = randomStart(), crossWordLength = this.crossWord.length; col < crossWordLength; col++) {
                boardLine = direction === 'v' ? getColumn(col) : this.crossWord[col];

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
    },
    showBoard: function() {
        var _ = this,
            randomLetter = function () {
                return Math.random().toString(36)
                       .substr(2,16).replace(/\d/g, '')[0]
                       .toUpperCase();
            },
            applyLayout = function () {
                var spacedCrossWord = _.crossWord.join('\n').replace(/([A-Z0-9*])/g, function ($0) { 
                    return $0 + " "; 
                });

                if(_.prettyPrint === true) {
                    return spacedCrossWord.replace(/\*/g, function ($0) {
                        return randomLetter();
                    });
                }

                return spacedCrossWord;
            };

        console.log(applyLayout());
    }
};

module.exports = CrossWords;