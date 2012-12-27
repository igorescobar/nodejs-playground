// instrument by jscoverage, do not modifly this file
(function () {
  var BASE;
  if (typeof window === 'object') {
    BASE = window;
  } else if (typeof global === 'object') {
    BASE = global;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (!BASE._$jscoverage) {
    BASE._$jscoverage = {};
    BASE._$jscoverage_done = function (file, line) {
      _$jscoverage[file][line] ++;
    };
    BASE._$jscoverage_init = function (base, file, lines) {
      var tmp = [];
      for (var i = 0; i < lines.length; i ++) {
        tmp[lines[i]] = 0;
      }
      base[file] = tmp;
    };
  }
  if (typeof _$jscoverage_cond === 'undefined') {
    BASE._$jscoverage_cond = {};
    BASE._$jscoverage_cond_done = function (file, line, express) {
      _$jscoverage_cond[file][line] ++;
      return express;
    };
  }
})();
_$jscoverage_init(_$jscoverage, "/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js",["0","1","2","4","5","8","22","23","24","26","29","30","31","33","36","36","39","42","45","46","47","48","51","54","57","58","59","62","63","64","67","69","70","74","77","78","79","80","81","82","83","84","85","86","87","89","92","93","96","97","97","98","101","102","103","103","104","105","107","111","114","115","119","120","123","124","129","130","132","133","134","139","140","143","144","145","146","146","147","150","151","152","153","154","155","156","157","163","164","165","166","169","172","174","179","180","183","184","185","189","192","196"]);
_$jscoverage_init(_$jscoverage_cond, "/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js",["45","47","57","80","83","85","97","97","103","103","103","104","104","132","132","146","150","152","154","156","183"]);
_$jscoverage["/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js"].source = ["var CrossWords = function() {","    this.words = [];","    this.possiblePositions = [],","    this.crossWord = this.drawCrossWord();","    this.maxWordSlots = this.maxWordLength * 10;","    this.remainingSlots = this.maxWordSlots;","};","","CrossWords.prototype = {","    possibleDirections: ['h','v','d'],","    words: [],","    possiblePositions: [],","    crossWordSignal: '*',","    maxWordLength: 10,","    maxWordSlots: 0,","    remainingSlots: 0,","    randomPositions: true,","    prettyPrint: process.argv[2] !== \"--noobie\",","    wordsShortCut: process.argv[2] === \"--words\",","    crossWord: {},","    drawCrossWord: function () {","","        var crossWordLine = function (_) {","            for (var i = 1, lineDigit = _.crossWordSignal; i < _.maxWordLength; i++)","                lineDigit += _.crossWordSignal;","","            return lineDigit;","        };","","        var crossWord = [], line = crossWordLine(this);","        for (var i = 0; i < this.maxWordLength; i++)","            crossWord.push(line);","","      return crossWord;","    },","    orderByLength: function (words) {","        return words.sort(function (a, b) { return a.length <= b.length });","    },","    randomArrayPosition: function (array) {","        return array[Math.floor(Math.random() * array.length)];","    },","    prepareWord: function (word) {","        return word.toString().trim().replace(/\\W+/g, '').toUpperCase();","    },","    validateWord: function (word) {","        if (word.length > this.maxWordLength) {","            return {\"error\": \"Your word '\" + word + \"' can't be higher than 10 chars.\\n\"}","        } else if (word.length > this.remainingSlots) {","            return {\"error\": \"The word \" + word + \"' wasn't added. No slots available!\\n\"}","        } ","","        return true;","    },","    registerWord: function (word) {","        var word = this.prepareWord(word),","            validatedWord = this.validateWord(word);","","        if (typeof validatedWord !== \"boolean\") {","            process.stdout.write(validatedWord.error)","            return validatedWord.error;","        }","","        this.registerSlots(word);","        this.words.push(word);","        return this.words;","    },","    processTypedWords: function (words) {","        var _ = this, words = this.orderByLength(words.split(','));","        ","        words.forEach(function(word) { ","            _.registerWord(word);","        });","    },","    registerSlots: function (word) {","        return this.remainingSlots -= word.length;","    },","    registerWordsOnBoard: function () {","        var _ = this;","        _.getColumn = function (col, direction) {","            var line = [];","            if (direction === \"v\")","                for(var l = 0; l < _.crossWord.length; l++)","                    line.push(_.crossWord[l][col]);","            else if (direction === \"h\"){","                return _.crossWord[col];","            } else if (direction === \"d\") {","                for(var l = 0; l < _.crossWord.length; l++)","                    line.push(_.crossWord[l][l]);","            }","            return line.join('');","        };","","        _.searchFreeSlotByLine = function (line, word, start){","            var lineLength = line.length,","                wordLength = word.length-1;","","            for (var col = start, w = 0; col < lineLength; col++, w++) {","                if (line[col] === _.crossWordSignal || line[col] === word[w]) break;","                start++","            }","","            var end = start;","            for (var col = end, w = 0; col < lineLength; col++, w++) {","                if ((end - start) === wordLength && (line[col] === _.crossWordSignal || line[col] === word[w])) break;","                if (line[col] === _.crossWordSignal || line[col] === word[w]) {","                    end++;","                } else {","                    return _.searchFreeSlotByLine(line, word, end);","                }","            }","","            return [start, end]","        };","","        _.searchFreeSlot = function (word) {","            var wordLength = word.length-1,","                possiblePlaces = [];","","            // calculating all possible positions","            for(var d = 0, possibleDirectionsLength = _.possibleDirections.length; d < possibleDirectionsLength; d++){","                var direction = _.possibleDirections[d],","                    lineLength = _.maxWordLength;","","                for (var ln = 0; ln < _.maxWordLength; ln++){","                    var line = _.getColumn(ln, direction),","                        position = 0,","                        endCords = 0,","                        coords = [0,0];","","                    while(position < lineLength){","                        coords = _.searchFreeSlotByLine(line, word, position),","                        diffRange = coords[1] - coords[0];","                        if(diffRange === wordLength && coords[1] < lineLength)","                            possiblePlaces.push({'direction': direction, 'position': ln, 'word': word, 'coord': [coords[0], coords[1]]});","                        position++;","                    }                        ","                }","            }","            ","            _.possiblePositions[word] = possiblePlaces;            ","            return possiblePlaces;","        };","","        _.processDirections = function (directions) {","            var setCharAt = function (str, index, chr) {","                str = str || \"\"","                if(index > str.length - 1) return str;","                return str.substr(0, index) + chr + str.substr(index + 1);","            };","","            if (directions) {","                for(var i = directions.coord[0], w = 0; i <= directions.coord[1]; i++, w++) {","                    if (directions.direction === 'h') {","                        _.crossWord[directions.position] = setCharAt(_.crossWord[directions.position], i, directions.word[w]);","                    } else if (directions.direction === 'v') {","                        _.crossWord[i] = setCharAt(_.crossWord[i], directions.position, directions.word[w]);","                    } else if (directions.direction === 'd') {","                        _.crossWord[i] = setCharAt(_.crossWord[i], i, directions.word[w]);","                    }","                }","            }  ","        };","","        this.words.forEach(function(word){","            _.searchFreeSlot(word);","            possiblePlaces = _.randomPositions ? _.randomArrayPosition(_.possiblePositions[word]) : _.possiblePositions[word][0]","            _.processDirections(possiblePlaces);","        });","","        return _;","    },","    showBoard: function() {","        var _ = this,","            randomLetter = function () {","                return Math.random().toString(36)","                       .substr(2,16).replace(/\\d/g, '')[0]","                       .toUpperCase();","            },","            applyLayout = function () {","                var spacedCrossWord = _.crossWord.join('\\n').replace(/([A-Z0-9*])/g, function ($0) { ","                    return $0 + \" \"; ","                });","","                if(_.prettyPrint === true) {","                    return spacedCrossWord.replace(/\\*/g, function ($0) {","                        return randomLetter();","                    });","                }","","                return spacedCrossWord;","            };","","        return applyLayout();","    }","};","","module.exports = CrossWords;"];
_$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "0");
var CrossWords = function() {
    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "1");
    this.words = [];
    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "2");
    this.possiblePositions = [], this.crossWord = this.drawCrossWord();
    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "4");
    this.maxWordSlots = this.maxWordLength * 10;
    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "5");
    this.remainingSlots = this.maxWordSlots;
};

_$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "8");
CrossWords.prototype = {
    possibleDirections: [ "h", "v", "d" ],
    words: [],
    possiblePositions: [],
    crossWordSignal: "*",
    maxWordLength: 10,
    maxWordSlots: 0,
    remainingSlots: 0,
    randomPositions: true,
    prettyPrint: process.argv[2] !== "--noobie",
    wordsShortCut: process.argv[2] === "--words",
    crossWord: {},
    drawCrossWord: function() {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "22");
        var crossWordLine = function(_) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "23");
            for (var i = 1, lineDigit = _.crossWordSignal; i < _.maxWordLength; i++) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "24");
                lineDigit += _.crossWordSignal;
            }
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "26");
            return lineDigit;
        };
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "29");
        var crossWord = [], line = crossWordLine(this);
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "30");
        for (var i = 0; i < this.maxWordLength; i++) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "31");
            crossWord.push(line);
        }
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "33");
        return crossWord;
    },
    orderByLength: function(words) {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "36");
        return words.sort(function(a, b) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "36");
            return a.length <= b.length;
        });
    },
    randomArrayPosition: function(array) {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "39");
        return array[Math.floor(Math.random() * array.length)];
    },
    prepareWord: function(word) {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "42");
        return word.toString().trim().replace(/\W+/g, "").toUpperCase();
    },
    validateWord: function(word) {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "45");
        if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "45", word.length > this.maxWordLength)) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "46");
            return {
                error: "Your word '" + word + "' can't be higher than 10 chars.\n"
            };
        } else {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "47");
            if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "47", word.length > this.remainingSlots)) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "48");
                return {
                    error: "The word " + word + "' wasn't added. No slots available!\n"
                };
            }
        }
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "51");
        return true;
    },
    registerWord: function(word) {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "54");
        var word = this.prepareWord(word), validatedWord = this.validateWord(word);
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "57");
        if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "57", typeof validatedWord !== "boolean")) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "58");
            process.stdout.write(validatedWord.error);
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "59");
            return validatedWord.error;
        }
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "62");
        this.registerSlots(word);
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "63");
        this.words.push(word);
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "64");
        return this.words;
    },
    processTypedWords: function(words) {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "67");
        var _ = this, words = this.orderByLength(words.split(","));
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "69");
        words.forEach(function(word) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "70");
            _.registerWord(word);
        });
    },
    registerSlots: function(word) {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "74");
        return this.remainingSlots -= word.length;
    },
    registerWordsOnBoard: function() {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "77");
        var _ = this;
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "78");
        _.getColumn = function(col, direction) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "79");
            var line = [];
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "80");
            if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "80", direction === "v")) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "81");
                for (var l = 0; l < _.crossWord.length; l++) {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "82");
                    line.push(_.crossWord[l][col]);
                }
            } else {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "83");
                if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "83", direction === "h")) {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "84");
                    return _.crossWord[col];
                } else {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "85");
                    if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "85", direction === "d")) {
                        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "86");
                        for (var l = 0; l < _.crossWord.length; l++) {
                            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "87");
                            line.push(_.crossWord[l][l]);
                        }
                    }
                }
            }
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "89");
            return line.join("");
        };
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "92");
        _.searchFreeSlotByLine = function(line, word, start) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "93");
            var lineLength = line.length, wordLength = word.length - 1;
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "96");
            for (var col = start, w = 0; col < lineLength; col++, w++) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "97");
                if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "97", line[col] === _.crossWordSignal) || _$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "97", line[col] === word[w])) {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "97");
                    break;
                }
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "98");
                start++;
            }
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "101");
            var end = start;
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "102");
            for (var col = end, w = 0; col < lineLength; col++, w++) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "103");
                if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "103", end - start === wordLength) && (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "103", line[col] === _.crossWordSignal) || _$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "103", line[col] === word[w]))) {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "103");
                    break;
                }
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "104");
                if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "104", line[col] === _.crossWordSignal) || _$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "104", line[col] === word[w])) {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "105");
                    end++;
                } else {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "107");
                    return _.searchFreeSlotByLine(line, word, end);
                }
            }
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "111");
            return [ start, end ];
        };
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "114");
        _.searchFreeSlot = function(word) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "115");
            var wordLength = word.length - 1, possiblePlaces = [];
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "119");
            for (var d = 0, possibleDirectionsLength = _.possibleDirections.length; d < possibleDirectionsLength; d++) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "120");
                var direction = _.possibleDirections[d], lineLength = _.maxWordLength;
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "123");
                for (var ln = 0; ln < _.maxWordLength; ln++) {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "124");
                    var line = _.getColumn(ln, direction), position = 0, endCords = 0, coords = [ 0, 0 ];
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "129");
                    while (position < lineLength) {
                        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "130");
                        coords = _.searchFreeSlotByLine(line, word, position), diffRange = coords[1] - coords[0];
                        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "132");
                        if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "132", diffRange === wordLength) && _$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "132", coords[1] < lineLength)) {
                            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "133");
                            possiblePlaces.push({
                                direction: direction,
                                position: ln,
                                word: word,
                                coord: [ coords[0], coords[1] ]
                            });
                        }
                        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "134");
                        position++;
                    }
                }
            }
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "139");
            _.possiblePositions[word] = possiblePlaces;
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "140");
            return possiblePlaces;
        };
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "143");
        _.processDirections = function(directions) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "144");
            var setCharAt = function(str, index, chr) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "145");
                str = str || "";
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "146");
                if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "146", index > str.length - 1)) {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "146");
                    return str;
                }
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "147");
                return str.substr(0, index) + chr + str.substr(index + 1);
            };
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "150");
            if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "150", directions)) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "151");
                for (var i = directions.coord[0], w = 0; i <= directions.coord[1]; i++, w++) {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "152");
                    if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "152", directions.direction === "h")) {
                        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "153");
                        _.crossWord[directions.position] = setCharAt(_.crossWord[directions.position], i, directions.word[w]);
                    } else {
                        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "154");
                        if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "154", directions.direction === "v")) {
                            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "155");
                            _.crossWord[i] = setCharAt(_.crossWord[i], directions.position, directions.word[w]);
                        } else {
                            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "156");
                            if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "156", directions.direction === "d")) {
                                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "157");
                                _.crossWord[i] = setCharAt(_.crossWord[i], i, directions.word[w]);
                            }
                        }
                    }
                }
            }
        };
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "163");
        this.words.forEach(function(word) {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "164");
            _.searchFreeSlot(word);
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "165");
            possiblePlaces = _.randomPositions ? _.randomArrayPosition(_.possiblePositions[word]) : _.possiblePositions[word][0];
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "166");
            _.processDirections(possiblePlaces);
        });
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "169");
        return _;
    },
    showBoard: function() {
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "172");
        var _ = this, randomLetter = function() {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "174");
            return Math.random().toString(36).substr(2, 16).replace(/\d/g, "")[0].toUpperCase();
        }, applyLayout = function() {
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "179");
            var spacedCrossWord = _.crossWord.join("\n").replace(/([A-Z0-9*])/g, function($0) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "180");
                return $0 + " ";
            });
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "183");
            if (_$jscoverage_cond_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "183", _.prettyPrint === true)) {
                _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "184");
                return spacedCrossWord.replace(/\*/g, function($0) {
                    _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "185");
                    return randomLetter();
                });
            }
            _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "189");
            return spacedCrossWord;
        };
        _$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "192");
        return applyLayout();
    }
};

_$jscoverage_done("/home/igorescobar/www/nodejs-playground/crosswords/crosswords.js", "196");
module.exports = CrossWords;