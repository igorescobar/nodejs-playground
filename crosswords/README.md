# How it works?
It's pretty simple. Once inputed the words you would like to add to the board, 
the algorithm calulates all possible positions for each word (vertically, horizontally and bias). 
Once it has the answer, the algorithm pick a random possible position for each word 
and plot it to the board.
# How to play:
  * node start.js
  * node start.js --noobie
  * node start.js --words word1,word2,word3,word4

# Running tests
  * `./expresso`

# Running Code Coverage Report
  * `CROSSWORDS_COV=1 ./expresso`
  * `CROSSWORDS_COV=1 ./expresso -c --json coverage.json`

# Examples
## Interactive mode
> A simple interactive setup of the crossword

`node start.js`

    Type the words that you want to include on crossword game separed by comma: cross,words,cool
    H D E O C N X F N F 
    O K G G B B M H S Y 
    V E K Y Z E W L F V 
    Q R B R O C O O L G 
    C F E S G N Z V O S 
    I Y I O H N S D L D 
    C R O S S S I Y V T 
    R T R Q U T K V M F 
    A N M R J W O R D S 
    T O I C H Q C Z R A 
    Have fun! :)

## Noobie mode
> It's just a mode to help you to identify the words more easily

`node start.js --noobie`

    * * * * * * * * * * 
    * * * * * * * * * * 
    * * * * * * * * * * 
    * * * 2 0 1 3 * * * 
    * C R O S S * * * * 
    * * * * * C * * * * 
    * * * * * W O R D S 
    * * * * * * * O * * 
    * * * * * * * * L * 
    * * * * * * * * * * 
    Have fun! :)

## --words mode
> A simple way to unactive the interactive mode and generate your crossword a little bit faster.

`node start.js --words cross,words,cool`

    I J C R F L R Z T Y 
    E M Y F J C S U I M 
    A H Y J Z N V H M Y 
    M O Y U R L I B O P 
    I J U B I W O R D S 
    R Y A U N X W Z U C 
    X K Q H X K N V A O 
    F M Z D K S X V C O 
    P V U E E C B W M L 
    C R O S S G A O M S 
    Have fun! :)