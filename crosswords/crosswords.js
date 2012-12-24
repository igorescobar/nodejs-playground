var CrossWords = function() {
    this.words = [];
    this.possiblePositions = [],
    this.crossWord = this.drawCrossWord();
    this.maxWordSlots = this.maxWordLength * 10;
    this.remainingSlots = this.maxWordSlots;
};

CrossWords.prototype = {
    possibleDirections: ['h','v','d'],
    words: [],
    possiblePositions: [],
    crossWordSignal: '*',
    maxWordLength: 10,
    maxWordSlots: 0,
    remainingSlots: 0,
    randomPositions: true,
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
        for (var i = 0; i < this.maxWordLength; i++)
            crossWord.push(line);

      return crossWord;
    },
    orderByLength: function (words) {
        return words.sort(function (a, b) { return a.length <= b.length });
    },
    randomArrayPosition: function (array) {
        return array[Math.floor(Math.random() * array.length)];
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
            process.stdout.write(validatedWord.error)
            return validatedWord.error;
        }

        this.registerSlots(word);
        this.words.push(word);
        return this.words;
    },
    processTypedWords: function (words) {
        var _ = this, words = this.orderByLength(words.split(','));
        
        words.forEach(function(word) { 
            _.registerWord(word);
        });
    },
    registerSlots: function (word) {
        return this.remainingSlots -= word.length;
    },
    registerWordsOnBoard: function () {
        var _ = this;
        _.getColumn = function (col, direction) {
            var line = [];
            if (direction === "v")
                for(var l = 0; l < _.crossWord.length; l++)
                    line.push(_.crossWord[l][col]);
            else if (direction === "h"){
                return _.crossWord[col];
            } else if (direction === "d") {
                for(var l = 0; l < _.crossWord.length; l++)
                    line.push(_.crossWord[l][l]);
            }
            return line.join('');
        };

        _.searchFreeSlotByLine = function (line, word, start){
            var lineLength = line.length,
                wordLength = word.length-1;

            for (var col = start, w = 0; col < lineLength; col++, w++) {
                if (line[col] === _.crossWordSignal || line[col] === word[w]) break;
                start++
            }

            var end = start;
            for (var col = end, w = 0; col < lineLength; col++, w++) {
                if ((end - start) === wordLength && (line[col] === _.crossWordSignal || line[col] === word[w])) break;
                if (line[col] === _.crossWordSignal || line[col] === word[w]) {
                    end++;
                } else {
                    return _.searchFreeSlotByLine(line, word, end);
                }
            }

            return [start, end]
        };

        _.searchFreeSlot = function (word) {
            var wordLength = word.length-1,
                possiblePlaces = [];

            // calculating all possible positions
            for(var d = 0, possibleDirectionsLength = _.possibleDirections.length; d < possibleDirectionsLength; d++){
                var direction = _.possibleDirections[d],
                    lineLength = _.maxWordLength;

                for (var ln = 0; ln < _.maxWordLength; ln++){
                    var line = _.getColumn(ln, direction),
                        position = 0,
                        endCords = 0,
                        coords = [0,0];

                    while(position < lineLength){
                        coords = _.searchFreeSlotByLine(line, word, position),
                        diffRange = coords[1] - coords[0];
                        if(diffRange === wordLength && coords[1] < lineLength)
                            possiblePlaces.push({'direction': direction, 'position': ln, 'word': word, 'coord': [coords[0], coords[1]]});
                        position++;
                    }                        
                }
            }
            
            _.possiblePositions[word] = possiblePlaces;            
            return possiblePlaces;
        };

        _.processDirections = function (directions) {
            var setCharAt = function (str, index, chr) {
                str = str || ""
                if(index > str.length - 1) return str;
                return str.substr(0, index) + chr + str.substr(index + 1);
            };

            if (directions) {
                for(var i = directions.coord[0], w = 0; i <= directions.coord[1]; i++, w++) {
                    if (directions.direction === 'h') {
                        _.crossWord[directions.position] = setCharAt(_.crossWord[directions.position], i, directions.word[w]);
                    } else if (directions.direction === 'v') {
                        _.crossWord[i] = setCharAt(_.crossWord[i], directions.position, directions.word[w]);
                    } else if (directions.direction === 'd') {
                        _.crossWord[i] = setCharAt(_.crossWord[i], i, directions.word[w]);
                    }
                }
            }  
        };

        this.words.forEach(function(word){
            _.searchFreeSlot(word);
            possiblePlaces = _.randomPositions ? _.randomArrayPosition(_.possiblePositions[word]) : _.possiblePositions[word][0]
            _.processDirections(possiblePlaces);
        });

        return _;
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

        return applyLayout();
    }
};

module.exports = CrossWords;