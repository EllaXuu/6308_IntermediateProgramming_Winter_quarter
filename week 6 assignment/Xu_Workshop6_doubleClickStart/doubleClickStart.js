// create this function to check if you single click or double click
$(function() {

	var DELAY = 700, clicks = 0, timer = null;
	
	$("a").on("click", function(e){	
		//https://www.w3schools.com/jsref/event_detail.asp
		//The detail property returns a number with details about the event
		//When used on onclick and ondblclick, the number indicates the current click count.
		clicks=event.detail;
		clearTimeout(timer); //clear the timer 

		// your code goes here
		if(clicks>=2){//if click more than once, quit this function
			return;
		}
		else{// if click only once, set the timer
			timer= setTimeout(function(){//after 700 ms, this function will run
		    alert("Single click!");
		    clicks=0;//cleat the clicks number
		}, DELAY);
		}

	 })
	.on("dblclick", function(e){//when double click event
        e.preventDefault();  //cancel system double-click event
        alert("Double click!");
		clicks=0;//cleat the clicks number
    });	

});