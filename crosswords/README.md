# How it works?
It's pretty simple. Once inputed the words you would like to add to the board, 
the algorithm calulates all possible positions for each word (vertically and horizontally). 
Once it has the answer, the algorithm pick a random possible position for each word 
and plot it to the board.
# How to play:
  * node start.js
  * node start.js --noobie
  * node start.js --words word1,word2,word3,word4

# Examples
$> node start
$> Type the words that you want to include on crossword game separed by comma: palavras,cruzadas,cool

`H D E O C N X F N F `

`O K G G B B M H S Y `

`V E K Y Z E W L F V `

`Q R B R O C O O L G `

`C F E S G N Z V O S `

`I Y I O H N S D L D `

`C R O S S S I Y V T `

`R T R Q U T K V M F `

`A N M R J W O R D S `

`T O I C H Q C Z R A `

`Have fun! :)`


$> node start.js --noobie

`* * C * * * * * * * `

`* * O * * * * * * * `

`* * O * * * * * * * `

`* * L * * * * * * * `

`* * * * * * * * * * `

`* * * C R O S S * * `

`* W O R D S * * * * `

`* * * * * * * * * * `

`* * * * * * * * * * `

`* * * * * * * * * * `

`Have fun! :)`


$> node start.js --words cross,words,cool

`I J C R F L R Z T Y `

`E M Y F J C S U I M `

`A H Y J Z N V H M Y `

`M O Y U R L I B O P `

`I J U B I W O R D S `

`R Y A U N X W Z U C `

`X K Q H X K N V A O `

`F M Z D K S X V C O `

`P V U E E C B W M L `

`C R O S S G A O M S `

`Have fun! :)`

