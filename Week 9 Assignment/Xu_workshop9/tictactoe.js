/* These two variables are declared in the global space
	because they are used to track the game state throughout. */
	
var boardArray=[]; // represents the 9 squares (0-8) of the tic-tac-toe board

// For the purposes of our game:
// 0 in an array space means the game square is empty
// 1 in an array space means that "x" (the human) occupies the square
// 2 in an array space means that "o" (the computer) occupies the square

var moveCount = 0; // represents the number of squares filled in current game

var gameOverMessege= document.getElementById('gameOver');
var playAgainBT =document.getElementById('playAgain');


/* Complete this function by following the instructions within */
function setUpGame() {
	for (var i=0; i<=8; i++) {
		boardArray[i]=0;//1
		let element = document.getElementById('square'+i);//2
        element.src="empty.jpg";//3
        element.addEventListener('click',function(){
        	console.log("click");
					attemptPlayerMove(event.currentTarget);
				}, false);//4

	/* Within this loop:
		1. set each element of boardArray (indexed by i) to 0
		2. get the element from the HTML document called "square" + i
		3. set the "source" attribute of the element refer to the file "empty.jpg"
		4. add a "click" event listener to the element as follows:
		
				addEventListener("click", function(event){
					attemptPlayerMove(event.currentTarget);
				}, false);
				
			HINT: This is an object method, so you need to call addEventListener
			on the object to which you wish to add the event
			(i.e., myobject.addEventListener())
	*/
	} // loop ends here

	/* Remainder of setUpGame function goes here:
		1. set moveCount to 0
		2. hide your "game over" message
		3. hide your "play again" button
	*/
	moveCount=0;//1
	gameOverMessege.className="hide";//2
	playAgainBT.className='hide';//3
}

function attemptPlayerMove(eventTarget) {
	/* 	NOTE: the local variable "square" here is looking at the last
		character of the id string of the item that detected a
		click event and sent us here. We can safely use -1 here
		to get the LAST character of the string because we know
		there are only 9 squares (numbered 0 to 8) in our game.
		If we had to go into double digits, this could be trickier! */
		
	var square = eventTarget.id.slice(-1);
	
	if (boardArray[square]==0) { // if the square is empty...
		makePlayerMove(square);//1
		let isGameOver =checkForGameOver();//2
		if(!isGameOver){//3
			makeComputerMove();
		}
		/* Within this conditional:
			1. pass the selected square to the function makePlayerMove()
			2. declare a local variable called isGameOver and have it store
				the result of calling the function checkForGameOver()
			3. If the game isn't over, call makeComputerMove()
			
			NOTE: if the game IS over, then the computer will not be told to
			make another move, and the player's only option will to be to hit
			the "Play Again" button, which is handled within checkForGameOver()
		*/
	} // end conditional
	console.log(moveCount);//test
}

function makePlayerMove(square) {
	/* This function should:
		1. Set the boardArray element referenced by "square" to indicate that
			it is now filled by a player piece (see data structure at top)
		2. Remove the "click" event listener from the square so that it can't
			be clicked on again during this game
		3. Change the square's image to "x.jpg"
		4. increment moveCount by 1
	*/
	boardArray[square]=1;//1
	let element = document.getElementById('square'+square);
	element.removeEventListener('click',function(){//2
        	console.log("click");
					attemptPlayerMove(event.currentTarget);
				}, false);
	element.src='x.jpg';//3
	moveCount++;//4
}

function checkForGameOver() {
	/* This function should:
		1. Check if all moves have been made (hint: there are 9 moves!)
		2. If all moves have been made:
			a. show the "game over" and the "play again" button
			b. return true to the calling function
		3. If all moves have not been made:
			a. return false to the calling function
	*/
	if(moveCount==9){//1
		gameOverMessege.className="";//2.a
		playAgainBT.className="";
		return true//2.b
	}
	else{//3
		return false;
	}
}

function makeComputerMove() {
	var madeMyMove = false;
	while (madeMyMove == false) {
		let randomNum = Math.floor(Math.random()*9);//1
		if (boardArray[randomNum]==0){//2
			boardArray[randomNum]=2;//3.a
			let element = document.getElementById('square'+randomNum);
			element.removeEventListener('click',function(){//3.b
        	console.log("click");
					attemptPlayerMove(event.currentTarget);
				}, false);
			element.src='o.jpg';//3.c
			moveCount++;//3.d
			madeMyMove=true;//3.e
		}
		/* Within this "while" loop:
			1. select a random number between 0 and 8
			2. check to see if that square of the tic-tac-toe board is empty
				(as defined in our data structure at the top of this document)
			3. If the square is empty:
				a. Mark its space in the array as containing a computer piece
				b. Remove the "click" event listener from the square so that it can't
					be clicked on again during this game
				c. Change the square's image to "o.jpg"
				d. increment moveCount by 1
				e. set madeMyMove to true <- IMPORTANT TO AVOID INFINITE LOOP!
		*/
	}
}

playAgainBT.addEventListener('click',setUpGame);//1
setUpGame();//2
/* Last things that only need to be done the first time your script runs!
	1. add a "click" event listener to your "play again" button that calls the
		setUpGame function when the button is clicked (when the button is
		hidden, it can't be clicked, so we don't have to remove its event
		listener like we have to for game squares)
	2. add a call to the setUpGame function to start your game!
*/
