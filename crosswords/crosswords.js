var CrossWords = function() {
    this.words = [];
    this.possiblePositions = [],
    this.crossWord = this.drawCrossWord();
    this.maxWordSlots = this.maxWordLength * 10;
    this.remainingSlots = this.maxWordSlots;
};

CrossWords.prototype = {
    possibleDirections: ['h','v'],
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
    randomArray: function (array) {
        return array.sort(function () { 
            return 0.5 - Math.random();
        });
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
        var _ = this,
        getColumn = function (col) {
            var line = [];
            for(var l = 0; l < _.crossWord.length; l++)
                line.push(_.crossWord[l][col]);

            return line.join('');
        },
        searchFreeSlotByLine = function (line, word, start){
            var lineLength = line.length,
                wordLength = word.length;

            for (var col = start; col < lineLength; col++) {
                if(line[col] === _.crossWordSignal || line[col] === word[col]) break;
                start++
            }

            var end = start;
            for (var col = end; col <= lineLength; col++) {
                var rangeSize = end - start;
                if (rangeSize == wordLength) break;
                if (line[col] === _.crossWordSignal || line[col] === word[col]) {
                    end++
                } else {
                    return searchFreeSlotByLine(line, word, start + 1);
                }
            }

            return [start, end]
        },
        searchFreeSlot = function (word) {
            var wordLength = word.length,
                possiblePlaces = [];

            // calculating all possible horizontal and verital positions
            for(var d = 0, possibleDirectionsLength = _.possibleDirections.length; d < possibleDirectionsLength; d++){
                var direction = _.possibleDirections[d];

                for (var ln = 0; ln < _.maxWordLength; ln++){
                    var line = direction === 'v' ? getColumn(ln) : _.crossWord[ln],
                        lineLength = line.length,
                        endCords = 0,
                        coords = searchFreeSlotByLine(line, word, endCords);

                    while (coords[1] <= lineLength){
                        possiblePlaces.push({'direction': direction, 'position': ln, 'word': word, 'coord': [coords[0], coords[1]]});
                        coords = searchFreeSlotByLine(line, word, endCords++);
                    }
                }
            }
            // pick a random free position if randomPositions is true
            _.possiblePositions = possiblePlaces;
            possiblePlaces = _.randomPositions ? _.randomArray(possiblePlaces)[0] : possiblePlaces[0]
            return typeof possiblePlaces === "object" ? possiblePlaces : {};
        },
        processDirections = function (directions) {
            var setCharAt = function (str, index, chr) {
                if(index > str.length - 1) return str;
                return str.substr(0, index) + chr + str.substr(index + 1);
            };

            if (directions) {
                for(var i = directions.coord[0], w = 0; i < directions.coord[1]; i++) {
                    if (directions.direction === 'h') {
                        _.crossWord[directions.position] = setCharAt(_.crossWord[directions.position], i, directions.word[w]);
                    } else {
                        _.crossWord[i] = setCharAt(_.crossWord[i], directions.position, directions.word[w]);
                    }

                    w++;
                }
            }  
        };

        this.words.forEach(function(word){
            processDirections(searchFreeSlot(word));
        });
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