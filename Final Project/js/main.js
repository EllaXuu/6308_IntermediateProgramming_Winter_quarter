$(document).ready(function(){

// -=-=-=-=-==-=-=-=-= variables --=-=-=-=-=-=-=-=//
var username;
//main page variable
var pets=['css/img/pets/cat1.png','css/img/pets/cat2.png','css/img/pets/cat3.png','css/img/pets/cat4.png','css/img/pets/cat5.png',
'css/img/pets/dog1.png','css/img/pets/dog2.png','css/img/pets/dog3.png','css/img/pets/dog4.png','css/img/pets/dog5.png'];
var pickpet=[];//store the picked pet num
var pick=true;

let theDate = new Date();
let theDay= theDate.getDate();
let currentHour = theDate.getHours();//get the current hour

//task page gvariable
var taskname= document.getElementById('taskTitle');
var tasktext=document.getElementById('taskContent');
var selectStartTime;
var selectEndTime;
var selectedColor;

createHomePage();

function createHomePage(){
    $('#mainPage').hide();
    $('#taskPage').hide();
    $('#homePage').show();
}
$('#howToPlay').click(function(){
    swal("This is a memo application.\nYou can create your complete schedule about today:\nRecord your notes on the stickers!\nOr build your schedule at the calendar!\nAlso, you can also random some pets to accompany you!\nlet us start!");
});

$('#startPlay').click(function(){
    if($('#userInput').val()==''){
        swal('Please create a name to play.');
    }
    else{
        username=$('#userInput').val();
        console.log(username);
        createMainPage();
    }
});

//add click event to this button
$('#addpet').click(randomApet);

//create a function to turn to the mainpage
function createMainPage(){
    console.log('Main Page Now!');
    $('#mainPage').show();
    $('#taskPage').hide();
    $('#homePage').hide();
    $('body').css({
        'background-image':'url(css/img/wallpaper.png)',
        'background-repeat':'no-repeat',
        'background-size':'100%',
        'background-position':'left top'
    });
    $('#welcome').text('welcome! '+username);
    //display the count up time recording
    setInterval(countDownOnToday,1000);
    //display the time table 
    updateTimeTable();
}

//create a funciton to get a random pet
//and displayed on the main page 
function randomApet(){
    console.log('Add pet now!');
    //if already random 10 pets, show the reminder
    if(pickpet.length==10){
        // console.log('There is no more pets');
        swal('There is no more pets');

    }
    else {
    //if not get 10 pets ,then random a pet and show in the main page
    let randomNum= Math.floor(Math.random()*10);//get a random int between 0-9
    //get a random pet which never picked before
    for (i=0; i <pickpet.length; i++ ){
        if(pickpet[i]==randomNum){
            pick=false;
        }
    }
    if(pick){
    let pet=$('<img class="'+randomNum+'" src="'+pets[randomNum]+'">');
    //display the pet on the main page
    $('#petarea').append(pet);
    //set the css and draggable
    $('.'+randomNum+'').css({
        'position':'fixed',
        'left':'1%',
        'top':'80%',
        'height':'17%',
        'width':'11%'
    }).draggable();
    pickpet.push(randomNum); //update the pickpet list    
    } 
    else {
        //show the reminder to  remind user to pick again
        // console.log('you randomed an exist pits, plz random again!')
        swal('you randomed an exist pits, plz random again!');
        
    }
    pick=true;
    }
}


// -=-=-=-=-==-=-=-=-= current time --=-=-=-=-=-=-=-=//
//create a function to count up from the current time
function countDownOnToday(){
	let theDate = new Date();
	let theYear =theDate .getFullYear();
	let theMonth = theDate.getMonth()+1;
	let theDay= theDate.getDate();
	let theHour = theDate.getHours();
	let theMin= theDate.getMinutes();
	let theSecond= theDate.getSeconds();

	let theWeekDay=theDate.getDay();

	let theWeekDayName;
    switch (theWeekDay)
    {
    case 0:
      theWeekDayName="Today is Sunday";
      break;
    case 1:
      theWeekDayName="Today is Monday";
      break;
    case 2:
      theWeekDayName="Today is Tuesday";
      break;
    case 3:
      theWeekDayName="Today is Wednesday";
      break;
    case 4:
      theWeekDayName="Today is Thursday";
      break;
    case 5:
      theWeekDayName="Today is Friday";
      break;
    case 6:
      theWeekDayName="Today is Saturday";
      break;
    }
    //if it's a single number, then add a zero front of it.
    theMonth=addZeroForSingle(theMonth);
    theHour=addZeroForSingle(theHour);
    theMin=addZeroForSingle(theMin);
    theSecond=addZeroForSingle(theSecond);

	let currentTime=  theWeekDayName+" "+theYear + "." + theMonth + "." + theDay + ".  " + theHour + ":" + theMin + ":" + theSecond;
	$('#today').text(currentTime);	
	$('#taskPageMessege').text(currentTime);
}

//create a function to turn signle number to 0+single number
function addZeroForSingle(messege){
	if (messege<10){
		messege='0'+messege;
	}
	return messege;
}


// -=-=-=-=-==-=-=-=-= task page --=-=-=-=-=-=-=-=//

//create Task object
function Task(taskTitle,startTime,endTime,color,taskContent){
    this.title=taskTitle;
    this.start=startTime;
    this.end=endTime;
    this.color=color;
    this.content=taskContent||0;
}
//add event to buttons
$('#saveBtn').click(saveTask);
$('#deleteBtn').click(deleteTask);
$('#deleteALlBtn').click(deleteAllTask);

//create a function to create basic interface display when turn to the task page
function taskPageBsicDispaly(){
    //hide other pages and show the task page
    $('#mainPage').hide();
    $('#taskPage').show();
    $('#homePage').hide();

    $('body').css({
        'background-image':'url(css/img/homepage.png)',
        'background-repeat':'no-repeat',
        'background-size':'110%',
        'background-position':'left top'
    });
}

//turn to task page
function createTaskPage(){
    console.log("show new Task Page");

    //get the current clicked cell number from its id
    let currentNumber=Number(this.id);
    //second way to get current
    // let currentNumberArray=this.innerText.split(':');
    // let currentNumber=Number(currentNumberArray[0]);
    console.log('currentNumber: '+currentNumber);

    taskPageBsicDispaly();//change the interface from main page

    // empty items in task page
    $('#endhour').empty();//have to clear first and then append!!
    $('#starthour').empty();//have to clear first and then append!!
    $('#selectcolor').empty();

    var belongToLocal=false;

    //if there are some tasks already
    //when clicked a cell, just show the first task item which start time meet the key stored in localStorage 
    //only click the start time cell will show the exist task page
    if(localStorage.length>0){
        let key;
        for(var i =0; i <localStorage.length;i++){
            key=localStorage.key(i);
            var val= localStorage.getItem(key);
            var dataLocal=JSON.parse(localStorage.getItem(localStorage.key(i)));

            //if this clicked time equal to start time in this task
            if (dataLocal.start==currentNumber){
                belongToLocal=true;
            i=localStorage.length;}
         }
        console.log('the first dataLocal: '+dataLocal.start);

        if(belongToLocal){
            //show the exsit task content
            //update the title and content
            $('#taskTitle').val(dataLocal.title);
            $('#taskContent').val(dataLocal.content);
            setTaskTime(currentNumber);
    
            //set the start time as the default selected 
            let taskeST= dataLocal.start.toString().padStart(2, "0") + ":00";
            for(let i=0; i <$('#starthour').children('option').length;i++){
            // console.log($('#starthour').children('option')[i].value);
            if($('#starthour').children('option')[i].value==taskeST){
            $('#starthour').children('option')[i].selected=true;}} 
            
            //set the end time as the default selected 
            let taskeET= dataLocal.end.toString().padStart(2, "0") + ":00";
            for(let i=0; i <$('#endhour').children('option').length;i++){
            // console.log($('#starthour').children('option')[i].value);
            if($('#endhour').children('option')[i].value==taskeET){
            $('#endhour').children('option')[i].selected=true;}}
    
            //set color
            setTaskColor();
            //console.log(dataLocal.color);
            //set the default selected of color
            switch(dataLocal.color){
                case 'red':
                $('#selectcolor').children('option')[0].selected=true;;
                break;
                case 'yellow':
                $('#selectcolor').children('option')[1].selected=true;
                $('#selectcolor').children('option')[1].className='yellowoption';
                break; 
                case 'green':
                $('#selectcolor').children('option')[2].selected=true;
                break;
                case 'purple':
                $('#selectcolor').children('option')[3].selected=true;
                break;
            }

        } else {
            //is this cell is not the start time of the task
            //show a new task page
        $('#taskTitle').val("");
        $('#taskContent').val("");
        //set the select boxed
        setTaskTime(currentNumber);
        setTaskColor();
        }

    }else {
        //if there is no task
        //show a clear task page
        $('#taskTitle').val("");
        $('#taskContent').val("");
        //set the select boxed
        setTaskTime(currentNumber);
        setTaskColor();
    }
   belongToLocal=false;
}

//create a functtion to delete a task from localstorage
function deleteTask(){

    //get the selected start time
    var start=$('#starthour option:selected').text();
    start=getPureNumberFromHour(start);
    //get the selected end time
    var end=$('#endhour option:selected').text();
    end=getPureNumberFromHour(end);

    //remove this task from localStorage
    var key=start+':'+end;
    // console.log("delete Key: "+key);
    localStorage.removeItem(key);

    //display the main page again
    $('#mainPage').show();
    $('#taskPage').hide();
    $('#homePage').hide();

    $('body').css({
        'background-image':'url(css/img/wallpaper.png)',
        'background-repeat':'no-repeat',
        'background-size':'100%',
        // 'background-position':'left top'
    });

   //update the time table
   updateTimeTable();
}

//create a function to delete ':00' from hour
//just return a hour number
function getPureNumberFromHour(hour){
    let numlist=hour.split(':');
    let number=Number(numlist[0]);
    return number;
}

//create a function to clear all tasks
function deleteAllTask(){
    //clear all localStorage
    localStorage.clear();
    
    //display the mainpage again
    $('#mainPage').show();
    $('#taskPage').hide();
    $('#homePage').hide();

    $('body').css({
        'background-image':'url(css/img/wallpaper.png)',
        'background-repeat':'no-repeat',
        'background-size':'100%',
        // 'background-position':'left top'
    });
   updateTimeTable();
}

//create a functiton to set two selectbox: start time and end time
//set the range :current time-24
//set the default option selected if clicked a table cell
//set the option change event
function setTaskTime(currentNumber){
	//get current time
	let theDate = new Date();
	let theDay= theDate.getDate();
	let theHour = theDate.getHours();
    
	var startTime=currentNumber.toString().padStart(2, "0");
	var endTime;
    var startTimeDigital=Number(startTime.substring(0,2));

	//set the options range of start time
	for (let i=theHour; i <24;i++){
		let hrStr = i.toString().padStart(2, "0") + ":";
		let val=hrStr+"00";
		 $('#starthour').append('<option val="' + val + '">' + val + '</option>');

	}    
    //set the options range of end time
    for (let i=startTimeDigital+1; i <24;i++){
        let hrStr = i.toString().padStart(2, "0") + ":";
        let val=hrStr+"00";
         $('#endhour').append('<option val="' + val + '">' + val + '</option>');
    } 
    
    //set default value
    let clickedNumber= currentNumber.toString().padStart(2, "0") + ":00";
    console.log("clickedNumber: "+clickedNumber);
     // $("#starthour").find("option[text=clickedNumber]").attr("selected","selected");
     // $("#starthour option[value='09:00']").attr("selected",true)
	for(let i=0; i <$('#starthour').children('option').length;i++){
		// console.log($('#starthour').children('option')[i].value);
		if($('#starthour').children('option')[i].value==clickedNumber){
		console.log("bingo");
		$('#starthour').children('option')[i].selected=true;

        $('#endhour').empty();//must clear fist
    	for (let i=currentNumber+1; i <=24;i++){
		let hrStr = i.toString().padStart(2, "0") + ":";
		let val=hrStr+"00";
		$('#endhour').append('<option val="' + val + '">' + val + '</option>');}
        
		}
	}
	    selectStartTime=currentNumber;
        selectEndTime=currentNumber+1;
        console.log("selectStartTime: "+selectStartTime+", selectEndTime: "+selectEndTime);	

    //add option change event to start time selection box
    //if start time changed, the end time will start from startTime+1
    //so it will never happen that end time is bigger than start time ^_^
    $('#starthour').on('change',function(e){
    	var ev = e||window.event;
        var target = ev.target||ev.srcElement;
        startTime=target.value;
        console.log("target startTime: "+startTime);
        
        //change the endhour according to the start time
        $('#endhour').val((Number(startTime.substring(0,2))+1).toString().padStart(2, "0") + ":"+"00");

        //adjust the range of the end time
        var startTimeDigital=Number(startTime.substring(0,2));
        console.log("startTimeDigital1: "+startTimeDigital)
        $('#endhour').empty();//must clear first
    	for (let i=startTimeDigital+1; i <=24;i++){
		let hrStr = i.toString().padStart(2, "0") + ":";
		let val=hrStr+"00";

		 $('#endhour').append('<option val="' + val + '">' + val + '</option>');
	} 
   
    //update the two global variables
        selectStartTime=Number(startTime.substring(0,2));
        selectEndTime=Number(startTime.substring(0,2))+1;
        console.log("selectStartTime: "+selectStartTime+", selectEndTime: "+selectEndTime);
    });   
    
}

//set the task color selection box
function setTaskColor(){
	//set all options
    $('#selectcolor').empty();
	$('#selectcolor').append('<option class="redoption">Urgent & Important</option>');
	$('#selectcolor').append('<option class="yellowoption">Urgent & Not Important</option>');
	$('#selectcolor').append('<option class="greenoption">Not Urgent & Important</option>');
	$('#selectcolor').append('<option class="purpleoption">Not Urgent & Not Important</option>');
    // $('#selectcolor').children('option')[0].selected=true;

	let color=document.getElementById('selectcolor');
	// set change event to each option
    color.addEventListener('change',function(e){
	// $('#selectcolor').onchange(function(e){
		// console.log(this.options[this.selectedIndex].value);
		this.className=this.options[this.selectedIndex].className;
		// console.log(e.target.value);

		switch (e.target.value)
        {
        case 'Urgent & Important':
          selectedColor='red';
          break;
        case 'Urgent & Not Important':
          selectedColor="yellow";
          break;
        case 'Not Urgent & Important':
          selectedColor="green";
          break;
        case 'Not Urgent & Not Important':
          selectedColor="purple";
          break;
        // default: selectedColor='red';
        }
        // console.log(selectedColor);
	})
}

//save the task 
function saveTask(){
	console.log('Save task now');
    if($('#taskTitle').val()==''){
        swal('Please imput your task title.');
    }
    else{
        //show the main page again
        $('#mainPage').show();
	    $('#taskPage').hide();
        $('#homePage').hide();
    
	    $('body').css({
	    	'background-image':'url(css/img/wallpaper.png)',
	    	'background-repeat':'no-repeat',
	    	'background-size':'100%',
	    	// 'background-position':'left top'
        });
       //save data to localStorage 
       storeTaskData();
       updateTimeTable();//update the time table
   }
}


//create a function to store task data to localStorage
function storeTaskData(){
    //if already have this key
    //then don not store to localStorage
    //else create a new TASK object and store to localstorage
    var beNew=true;
    
    //get the selescted time 
    var start=$('#starthour option:selected').text();
    start=getPureNumberFromHour(start);
    var end=$('#endhour option:selected').text();
    end=getPureNumberFromHour(end);
    //check in keys of localStorage
    //if exsit then set the beNew as false
    var mayBeKey=start+':'+end;
    console.log(mayBeKey)

    for(var i =0; i <localStorage.length;i++){
            key=localStorage.key(i);
            if(mayBeKey==key){
                beNew=false;
            }
        }
    //if this item is not exist in localStorage
    //create a new task an store to localStorage
    if(beNew){
        let newTask= new Task(taskname.value,start,end,selectedColor,tasktext.value);
        let taskKey=start+':'+end;
      localStorage.setItem(taskKey,JSON.stringify(newTask));
    } else{//if this task exsit, reset this task
        let newTask= new Task(taskname.value,start,end,selectedColor,tasktext.value);
        let taskKey=start+':'+end;
      localStorage.setItem(taskKey,JSON.stringify(newTask));
    }
    beNew=true;
}

//update the time table
//if there are some tasks in localStorage
//show title and color, and mouseover event on that table cell
//for other table cell,just show the default color and dbclick event
//if there is not tasks in locakstorage
//just create a table, for cell's time is befor the current time, show gray color and no event
//for cells that its time later than current time, show different color and dbclick event
function updateTimeTable(){

    $('#timeTable').empty();//clear the time table first
    // console.log('Time Table update from localStorage');
    var table=document.getElementById("timeTable");
    for(var i =0; i <6; i++){
        var tableRow=document.createElement('tr');//create rows
        table.appendChild(tableRow);

        for(var j=0; j<4;j ++){
            var tableCell=document.createElement('td');//create cells
            tableRow.appendChild(tableCell);
            tableCell.id=4*i+j;//0-23
            ;
            // set css for evert cell
            // add event for later cells
            if(tableCell.id==currentHour){
                //show different border to show the currentTime
                $(tableCell).css({
                    'background': 'pink',
                    'border-top': '4px dashed #f33535',
                    'border-bottom':'4px dashed #f33535',
                    'border-left': '4px dashed #f33535',
                    'border-right': '4px dashed #f33535'
                });
            }
            else if (tableCell.id<currentHour){//for earlier cells just gray them
                $(tableCell).css({
                    'background': '#c9d6df'
                });

            } else{//for later cells, add dbclick event
                tableCell.addEventListener('dblclick',createTaskPage);
            }
            //add text note for every cell
            let cellText = document.createTextNode(`${4*i+j}:00 - ${4*i+j+1}:00`);//task: 3-f add text to this button according to i and j
            tableCell.appendChild(cellText); 

           if(localStorage.length>0){
            //if there are some tasks already
            //show the tasks in the table

           for(var k=0; k <localStorage.length;k++){
            //for every task items in localStorage
            //show the title
            //change the color
            //add mouseover and mouseout event
            //get the k index task item
            var dataLocal=JSON.parse(localStorage.getItem(localStorage.key(k)));
        
            // if the cell at the task time periord
            if(tableCell.id>=dataLocal.start&&tableCell.id<dataLocal.end){
                console.log("binnnnnngo");
                //change the color
                switch(dataLocal.color){
                    case 'red':
                    $(tableCell).css('background','#ff165d');
                    break;
                    case 'yellow':
                    $(tableCell).css('background','#f9ed69');
                    break; 
                    case 'green':
                    $(tableCell).css('background','#30e3ca');
                    break;
                    case 'purple':
                    $(tableCell).css('background','#c3bef0');
                    break;
                    default :
                    $(tableCell).css('background','#ff165d');
                }
                //set task title
                //don't clear the text, add the task name if it own a task name already
                let cellcontent=document.createTextNode(`: *${dataLocal.title}`);
                tableCell.appendChild(cellcontent);
                //show title when mouse over to show complete title if its too long
                //add mouseout event to block the title information if mouse go away
                tableCell.addEventListener("mouseover",function(e){
                    var showDiv=document.getElementById('showDiv');
                    showDiv.style.left = event.clientX+'px';
                    showDiv.style.top = event.clientY+'px';
                    showDiv.style.display = 'block';
                    showDiv.innerHTML =`${this.innerHTML}`;
                });
                tableCell.addEventListener('mouseout',mouseOut);}
            }
        }  
    }
    }

}
//when mouse leave 
//block the showDIv 
function mouseOut() {
	// console.log("mouse out");
    var showDiv = document.getElementById('showDiv');
    showDiv.style.display = 'none';
    showDiv.innerHTML = '';
 }


})//end