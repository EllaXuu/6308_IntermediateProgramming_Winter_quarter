"use strict"
// Create an array for storing all person objects
let personTotal=[];

// 1a. Create a Person class
class Person{
	constructor(personName){
		this.name = personName;
		this.pets = [];
	}// end Person constructor
}// end Person class

// 1b. Create a Pet class
class Pet{
	constructor(petName, species){
		this.name = petName;
		this.species = species;
	}// end Pet constructor
}// end Pet class

//2a. Create a new Person object and a new Pet object
let person_1 = new Person("Mary");
let pet_1 = new Pet("Fluffy","cat");

//2b.add a Pet object to a Person object
function assignPetToPerson(petObject, personObject){
	personObject.pets.push(petObject);//add the perObject to the end of the pet array  in the personObject
}

//2b.test by assigning Fluffy(pet_1) to Mary(person_1)
assignPetToPerson(pet_1,person_1);

//3a. Create two more people and two new pets for the second person
let person_2 = new Person ("Luck");
let person_3 = new Person ("Manny");
let pet_2 = new Pet ("Stella","french bulldog");
let pet_3 = new Pet ("Dylan","husky");
assignPetToPerson(pet_2,person_2);
assignPetToPerson(pet_3,person_2);

// 3b. assign the same pet of person_1, the pet_1, to the third person
// And create two new pets for the third person
assignPetToPerson(pet_1,person_3);
let pet_4 = new Pet ("Cameron", "cat");
let pet_5 = new Pet ("Mitchell", "cat");
assignPetToPerson(pet_4,person_3);
assignPetToPerson(pet_5,person_3);

//5a. change Mary's pet'name, pet_1'name, to Mittens
pet_1.name = "Mittens";
// update the personTotal array
personTotal.push(person_1);
personTotal.push(person_2);
personTotal.push(person_3);

//4&5 Write a funtion to output all person's name and their pet's name and species.
function reportPets(personObject){
	//to check if this person own a pet or not
	//in case the undefined error for all properties of personObject.pets[0]
	if(personObject.pets.length>0){
		// set the original output string format
		//let outputString = personObject.name +": "+personObject.pets[0].name+"("+personObject.pets[0].species+")";
		let outputString = `${personObject.name}: ${personObject.pets[0].name} (${personObject.pets[0].species})`;//tyr a new way to output string ^_^
		
		// to check if this person own more than one pet
	    if(personObject.pets.length>1){
	    	for(let i =1; i<personObject.pets.length;i++){//for every following pet, add comma before its name
	    	   outputString =`${outputString}, ${personObject.pets[i].name} (${personObject.pets[i].species})`;
		    }
	    }
	console.log(outputString);// output
	}
	else{//if this person do not have any pets
		console.log(`${personObject.name} has no pets.`);
	}
}
// final output in console.log
reportPets(person_1);
reportPets(person_2);
reportPets(person_3);

// Bonus function
// Create a table to output all people and their pets
function outputPersonPetTable(personTotal){
	//set the PETS head's columns accourding to the longest number pets's number showing in the table
    setPetsHeader(personTotal);
	//connect to the table created in the html
	let personPettable = document.getElementById('personPetTable');

    //for each person to display his name and pets's information in the table
	for (let i =0; i < personTotal.length; i++){
		let personRow = personPettable.appendChild(document.createElement('tr')); //create a new row for each person
		let personName = personRow.appendChild(document.createElement('td'));  // create a new cell for this person in this row
		personName.appendChild(document.createTextNode(personTotal[i].name)); // display the person's name

        //for every pet the person own, display its name following the person's cell
		for (let j=0; j< personTotal[i].pets.length; j++){
			let petList = personRow.appendChild(document.createElement('td')); // create a new cell for this pet in this row
			petList.appendChild(document.createTextNode(`${personTotal[i].pets[j].name} (${personTotal[i].pets[j].species})`)); // display the pet's name and species in this cell

		}
	}
}

//set the PETS head's columns adjusted by the longest pets' number displayed in the table
function setPetsHeader(personTotal){
    let maxPetsNumOnePerson= 0;
    let personPetsLength= [];//set an array to store pet's number for every person
    //for each person, set their pet's number to array
    for (let i=0; i<personTotal.length; i++){
       personPetsLength.push(personTotal[i].pets.length);
    }
    //get the max number in the array
    maxPetsNumOnePerson= Math.max.apply(null,personPetsLength);//another method: Math.max(...Array)
    // set the PETS head's columns adjusted by the longest pets numbers of one person in this table
    document.getElementById('petsRow').colSpan=maxPetsNumOnePerson;
}

//call this funtion to final output
outputPersonPetTable(personTotal);