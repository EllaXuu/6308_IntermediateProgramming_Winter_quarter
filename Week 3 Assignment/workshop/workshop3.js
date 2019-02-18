var gradebookData = [];
var assignmentData = [];

class Student {
	constructor (firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.id = gradebookData.length;
		this.grades = [];
		// AT THE END OF STEP 15, ADD A LINE TO CALL addStudentRow HERE
        this.studentRow = addStudentRow(this.id, firstName, lastName);
	}
} // end class Student

class Assignment {
	constructor (assignmentName, totalPointValue) {
		this.assignmentName = assignmentName;
		this.totalPointValue = totalPointValue;
		this.id = assignmentData.length;
		// STEP 11 GOES HERE
        this.gradeColumn = addGradeColumn(assignmentName,totalPointValue);
	}
}

function createNewAssignment(assignmentName, totalPointValue) {
    // create a new assignment object to add to the assignment array...
    var assignment = new Assignment(assignmentName, totalPointValue);
    var i;
    assignmentData.push(assignment);
    /*  ... then update the gradebook so every student i has a 0 score in
        that assignment spot. (Note that students just have a number for each  
        assignment position; the assignment names are handled in the separate
        assignmentData array)
    */
    for (var i = 0; i < gradebookData.length; i = i + 1) {
        gradebookData[i].grades[assignment.id] = 0;
    }
}

function createNewStudent(firstName, lastName) {
    // create a new student object to add to the gradebook array...
    var student = new Student(firstName, lastName);
    var i;
    gradebookData.push(student);
    // update new student so s/he has a grade of 0 for every existing 
    // assignment i from the assignment array
    for (i = 0; i < assignmentData.length; i = i + 1) {
        student.grades[i] = 0;
    }
}

function updateStudentGrade(studentID, assignmentID, points) {
    gradebookData[studentID].grades[assignmentID] = points;
}

// STEP 10: WRITE YOUR INITIAL addGradeColumn FUNCTION HERE
function addGradeColumn(assignmentName, totalPointValue){
    let gradeHeaderRow = document.getElementById('gradeHeaders');
    let gradeColumn = document.createElement('td');
    gradeColumn.appendChild(document.createTextNode(assignmentName+' ('+totalPointValue+')'));
    gradeHeaderRow.appendChild(gradeColumn);

// STEP 17: EDIT addGradeColumn to ADD NEW COLUMNS TO ANY EXISTING STUDENTS
    for (let i =0; i< gradebookData.length; i++){
        let updateExsitStudentsCell = gradebookData[i].studentRow.appendChild(document.createElement('td'));
        updateExsitStudentsCell.appendChild(document.createTextNode('0'));
    }
    return gradeColumn;
}




function addStudentRow(studentID, firstName, lastName) {
    var gradeTable = document.getElementById('gradebook');
    var studentRow = gradeTable.appendChild(document.createElement('tr'));
    
    var id = studentRow.appendChild(document.createElement('td'));
    var studentName = studentRow.appendChild(document.createElement('td'));
    var studentPercent = studentRow.appendChild(document.createElement('td'));
    
    id.appendChild(document.createTextNode(studentID));
    studentName.appendChild(document.createTextNode(firstName + " " + lastName));     
    studentPercent.appendChild(document.createTextNode("0"));

    // STEPS 14-15: CREATE A LOOP TO ITERATE THROUGH THE ASSIGNMENTDATA ARRAY
    // AND ADD A TABLE CELL CONTAINING "0" FOR EACH. PUT A RETURN VALUE
    // AT THE END OF THE FUNCTION.
    for (let i = 0 ; i < assignmentData.length; i ++){
        let assignmentCell = document.createElement('td');
        assignmentCell.appendChild(document.createTextNode("0"));
        studentRow.appendChild(assignmentCell);
    }
    return studentRow;
}

// STEP 7: EDIT THIS FUNCTION
function promptForStudentInfo() {
    //alert("Prompting for Student Info!");
    let firstName = "";
    let lastName = "";
    do{
        firstName = prompt("Please enter the student's FIRST NAME:");
    }while(firstName.length <1);
    do{
        lastName = prompt("Please enter the student's LAST NAME:");
    }while(lastName.length <1);
    createNewStudent(firstName,lastName);
}

// STEPS 6 AND 9:
// IN STEP 6, WRITE A TEST FUNCTION TO MAKE SURE THE BUTTON WORKS
// IN STEP 9, EDIT THE FUNCTION TO WORK AS DESCRIBED
function promptForAssignmentInfo(){
    //test step 6
    //alert("Promptinf for Assignment Info.");
    let assignmentName = "";
    let assignmentValue = 0;
    do{
        assignmentName = prompt("Please enter the assignment's NAME:");
    }while(assignmentName.length <1);
    do{
        assignmentValue = Number(prompt("Please enter a point VALUE for the assignment:"));
    }while(assignmentValue <1);
    createNewAssignment(assignmentName,assignmentValue);
}



// STEPS 4-6: ADD YOUR CODE TO WIRE THE BUTTON OBJECTS TO THE FUNCTIONS
// HERE. FOR STEP 6, BE SURE TO ALSO ADD YOUR TEST FUNCTION ABOVE!

//task 4- step1
document.getElementById('addStudent').addEventListener('click',promptForStudentInfo,false);
document.getElementById('addAssignment').addEventListener('click',promptForAssignmentInfo,false);
// THIS TEST DATA STILL WORKS AT THE WORKSHOP END SINCE WE CALL THE ROUTINES
// NECESSARY TO UPDATE THE INTERFACE WHENEVR WE CREATE SOMETHING NEW

createNewStudent("Adam","Anders");
createNewAssignment("Homework#1", 10);
createNewStudent("Beth","Booker");
createNewAssignment("Homework#2", 20);

// THE TEST DATA BELOW DOES NOT WORK AS OF THE END OF THE WORKSHOP BECAUSE
// WE HAVE NOT YET WRITTEN A ROUTINE TO VISUALLY UPDATE EXISTING TABLE ROWS
// In addition, because I have removed the routine that I wrote for last week 
// to draw the gradebook, which also calculated the student grade percentages,
// that data just doesn't exist in this version (since we don't store a student's
// overall class score in Student objects right now.

updateStudentGrade(0, 0, 5);
updateStudentGrade(1, 1, 10);
