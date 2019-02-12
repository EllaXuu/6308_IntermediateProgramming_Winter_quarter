"use strict"
//tesk 2: create two arrays 
var gradebookData = [];// to store all students and their grades
var assignmentData = [];//to store Assignments and the total points available on each assignment.

//task 3: write a class for the Student here
class Student {
    constructor(firstName, lastName,gradebookData){
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = gradebookData.length;
        this.grades= [];
    }// end Student constructor
}//end Student class

// Assignment class
class Assignment {
	constructor (assignmentName, totalPointValue, assignmentData) {
		"use strict";
		this.assignmentName = assignmentName;
		this.totalPointValue = totalPointValue;
		this.id = assignmentData.length;
	} // end Assignment constructor
} // end Assignment class   `

//task 7: write function createNewAssignment here
function createNewAssignment(assignmentName,totalPointValue,assignmentData,gradebookData){
    var assignment = new Assignment(assignmentName,totalPointValue,assignmentData);
    assignmentData.push(assignment);//update the assignmentData array
    //task 9: set the default assignment score
    for (var i=0 ;i< gradebookData.length;i++){
        gradebookData[i].grades[assignment.id]=0;
    }
}

//task 5: write function createNewStudent here
function createNewStudent(firstName, lastName, assignmentData, gradebookData){
    var student= new Student(firstName,lastName,gradebookData);
    //task 12: set defalut grades for each student
    for(var i = 0; i <assignmentData.length; i++){
        student.grades[i]=0; 
    }
        gradebookData.push(student);//update the gradebookData array
}

//task 14: write a function to update a grade in the gradebook
function updateStudentGrade (studnetId,assignmentId,studentScore,gradebookData){
    gradebookData[studnetId].grades[assignmentId] = studentScore;

}
// OUTPUT CODE -- DO NOT EDIT THIS WEEK! 

function outputGradebook(gradebookData, assignmentData) {
    // for now, this routine will draw the gradebook once, since this isn't yet an
    // interactive page
    var i, j;
    
    // set up our assignment header column in gradebook
    var gradeHeader = document.createElement('tr');
    var gradeTable = document.getElementById('gradebook');
    var totalPoints = 0;
    
    gradeHeader.appendChild(document.createElement('td')); // firstName blank
    gradeHeader.appendChild(document.createElement('td')); // lastName blank
    gradeHeader.appendChild(document.createElement('td')); // total percentage blank
    for (i = 0; i < assignmentData.length; i = i + 1) {
        var assignmentHeader = document.createElement('td');
        assignmentHeader.appendChild(document.createTextNode(assignmentData[i].assignmentName + " (" + assignmentData[i].totalPointValue + ")"));
        gradeHeader.appendChild(assignmentHeader);
        totalPoints = totalPoints + assignmentData[i].totalPointValue;
    }
    gradeTable.appendChild(gradeHeader);
    
    // output students from gradebook
    for (i = 0; i  < gradebookData.length; i = i + 1) {
        var studentRow = gradeTable.appendChild(document.createElement('tr'));
        var id = studentRow.appendChild(document.createElement('td'));
        id.appendChild(document.createTextNode(gradebookData[i].id));
        var studentName = studentRow.appendChild(document.createElement('td'));
        studentName.appendChild(document.createTextNode(gradebookData[i].firstName +
                                                        " " + gradebookData[i].lastName));
        // we are creating a place for our student % but we don't know the value yet!
        var studentPercent = studentRow.appendChild(document.createElement('td'));
        var studentRunningTotal = 0;
        for (j = 0; j < gradebookData[i].grades.length; j = j + 1) {
            var gradeData = studentRow.appendChild(document.createElement('td'));
            var assignmentScore = gradebookData[i].grades[j];
            gradeData.appendChild(document.createTextNode(assignmentScore));
            studentRunningTotal = studentRunningTotal + assignmentScore;
        } 
        // now that we have a running total for this student we can calculate a percentage
        var studentPercentage = (studentRunningTotal/totalPoints) * 100;
        
        studentPercent.appendChild(document.createTextNode(studentPercentage.toFixed(1)));
    }

}

// END OF OUTPUT CODE

// UNCOMMENT THESE LINES WHEN INSTRUCTED IN THE WORKSHOP

 createNewStudent("Adam","Anders", assignmentData, gradebookData);
 createNewAssignment("Homework#1", 10, assignmentData, gradebookData);
 createNewStudent("Beth","Booker", assignmentData, gradebookData);
 createNewAssignment("Homework#2", 20, assignmentData, gradebookData);
 updateStudentGrade(0, 0, 5, gradebookData);
 updateStudentGrade(1, 1, 10, gradebookData);

outputGradebook(gradebookData, assignmentData);