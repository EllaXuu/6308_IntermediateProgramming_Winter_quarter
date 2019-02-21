"use strict"
//workshop 4
//create buttons and change their name by clicking

var theTable = document.getElementById("myTable");
var numRows = 3;
var numColumns = 3;

//task 1:Create a nested set of loops
for( let i =0; i <numRows; i++){
	//task 2: create a new table row  to this table
	let theRow= document.createElement('tr');//create a new table row
	theTable.appendChild(theRow);//appentd to this table
	//task 3: setting the inner loop j
	for (let j =0; j< numColumns; j++){
		let theCell = document.createElement('td');//task:3-a create a new cell
		theRow.appendChild(theCell);//task:3-b appentd to the i row

		let theButton= document.createElement('button');//task:3-c create a new button
		theButton.setAttribute('id',i+'_'+j);//task:3-d set id attribute

		theCell.appendChild(theButton);//task:3-e appentd the button to the j cell

		let theText = document.createTextNode(`Button ${3*i+j}`);//task: 3-f add text to this button according to i and j
		theButton.appendChild(theText);//task:3-g appentd this text node to the button
		theButton.addEventListener('click', changeMyName);//task: 3-h add click event
	}
}

//task 4,5: Create a function to change button's name
function changeMyName(){
	//console.log("got here.")//task:4 test
	//task 5-a: get the last character of the button's name as a number
	let myNumber = Number(this.innerText.charAt(this.innerText.length-1));
	//console.log(typeof(myNumber)+" "+myNumber);// take 6: test myNumber
	myNumber++;// task 7 
	this.innerText=`Button ${myNumber}`;//set the name of this button again
}