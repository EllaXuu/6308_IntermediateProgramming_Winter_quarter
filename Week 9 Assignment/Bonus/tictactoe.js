"use strict"
//  use two-dimensional array to reoresent the TIc Tac Toer boarder
let boardArray=[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]];
//use a two-dimensional array to store all prossibility for win
let WinArray=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]];
let playerMoveArray=[];
let computerMoveArray=[];
let countForWin=0;

//connect to dom elements
const gameOverMessege= document.getElementById('gameOver');
const playAgainBT =document.getElementById('playAgain');
const playTurnMessege= document.getElementById('playTurn'); 
const gameArea = document.getElementById('gameArea');

//add event to play again
playAgainBT.addEventListener('click',function(){
	location.reload();
});
setUpGame();

//create a function to set up a new game
function setUpGame(){
	// $('#gameArea').html("");
	// draw nine squares 
	for (let i=0; i <=2; i ++){
		for (let j=0; j<=2; j++){
			boardArray[i][j]=0;
			//dynamically add the 9 squares
			let element= document.createElement('img');
			element.id=i+'_'+j;
			gameArea.appendChild(element);
			element.src= "empty.jpg";
			element.style.position='fixed';
			element.style.top= (110+i*50)+'px';
			element.style.left = (50+j*50)+'px';

			element.addEventListener('click',attempMove);
		}
	}
	//reset all data
	playerMoveArray=[];
	computerMoveArray=[];
	countForWin=0;
	//reset the display
	gameOverMessege.className="hide";//2
	playAgainBT.className='hide';//3
	playTurnMessege.innerHTML= " Game Begin! ";
}

//create a function to attempt move
function attempMove(eventTarget){
	var square = eventTarget.target.id;
	let splitID = square.split("_");
    
    /* Within this conditional:
	1. pass the selected square to the function makePlayerMove()
	2. declare a local variable called isGameOver and have it store
		the result of calling the function checkForGameOver()
	3. If the game isn't over, call makeComputerMove()
	
	NOTE: if the game IS over, then the computer will not be told to
	make another move, and the player's only option will to be to hit
	the "Play Again" button, which is handled within checkForGameOver()
		*/
	if (boardArray[splitID[0]][splitID[1]]==0){
		makePlayerMove(splitID);
		checkForGameOver(playerMoveArray,"Player");
        

        if (!checkForGameOver(playerMoveArray,"Player")){
			makeComputerMove();
			checkForGameOver(computerMoveArray,"Computer");
		}
	}
}

//create a function to make a X move
function makePlayerMove(splitID) {
	//add this move the playerMoveArray
	let moveIndex= 3*Number(splitID[0])+Number(splitID[1]);
	playerMoveArray.push(moveIndex);
    //change the display part
	playTurnMessege.innerHTML= " It's X's turn! ";
    
    //set the boardArray element referenced by "square" 
	boardArray[Number(splitID[0])][Number(splitID[1])]=1;//1

	// Remove the "click" event listener
	let element = document.getElementById(splitID[0]+'_'+splitID[1]);
	element.removeEventListener('click',attempMove);
	//add event if click, then pop a reminder
	element.addEventListener('click',function(){
		confirm("Sorry, this square is occupied!");
	})
	//Change the square's image to "x.jpg"
	element.src='x.jpg';//3
}

//create a funciton to make computer to move randomly
function makeComputerMove() {
	//change the display
	playTurnMessege.textNote= " It's X's turn! ";
	//get two random numbers to move which is not be occupied
	var madeMyMove = false;
	while (madeMyMove == false) {
		let randomNum1 = Math.floor(Math.random()*3);//1
		let randomNum2 = Math.floor(Math.random()*3);//1
        // console.log("randomNum1: "+randomNum1+" randomNum2: "+randomNum2);
		if (boardArray[randomNum1][randomNum2]==0){//2
			boardArray[randomNum1][randomNum2]=2;//3.a
	        computerMoveArray.push(3*randomNum1+randomNum2);
            
	        // Remove the "click" event listener
			let element = document.getElementById(randomNum1+'_'+randomNum2);
	        element.removeEventListener('click',attempMove);
	        //add event if click, then pop a reminder
			element.addEventListener('click',function(){
				confirm("Sorry, this square is occupied!");
			})
	        //Change the square's image to "x.jpg"
			element.src='o.jpg';//3.c
			madeMyMove=true;//3.e
		}
	}
}

//create a function to check if win or not
function checkForGameOver(moveArray,name) {
	//for each item of WinArray
	//compare the move array to it
	for (let i=0; i < WinArray.length; i ++){
		countForWin=0;
		for (let j=0; j <WinArray[i].length; j ++){
			if (moveArray.indexOf(WinArray[i][j])!== -1){
				countForWin++;
			}
			//if there are 3 move item which match to one win item
			if (countForWin == 3){
				//change the dispaly
				playTurnMessege.innerHTML=name+" Win!!";
				playAgainBT.className="";
				gameOverMessege.className="";
				console.log(name+' Win!');
				return true;
			}
		}
	}

}
