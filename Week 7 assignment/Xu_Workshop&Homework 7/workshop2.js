"use strict"
//create a simple slot machine
$(document).ready(function(){

    //create an array to restore all images
    let randomImg = ['heart.jpg','clover.jpg','star.jpg'];
    let setIntervalId;// create a variable to receive result id of setInterval()
    let setTimeoutId;//create a variable to receive result id of the setTimeout()

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-event handler-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
    //add click, mouseover, mouseleave events to handler element
	$('#handlerUp')
	.on('click',function(e){//mouse single click handler event
		//clear all timeout and interval event
		//in case the situation that if mutipule clicks happened
		//the rolling will not stoped
		clearTimeout(setTimeoutId);
		clearInterval(setIntervalId);

        //when click the handler, show the down handle and play the BGM audio
		$('#handlerUp').attr('src','handle_down.jpg');
		$('#rollingBG')[0].play();//change jquery element to js element to control the audio play
		
		//the slot machine randomly swapped every 50ms for two seconds.
		//start Rolling: change three images every 50 ms ransomly
		console.log("Start Rolling now");
		setIntervalId = setInterval(function(){
			getRandomImg($('#slot1'));
            getRandomImg($('#slot2'));
            getRandomImg($('#slot3'));
		},50);
		
		//after 2 seconds, stop rolling and check if it's win or not
		setTimeoutId= setTimeout(function(){
			console.log("Times Up!");//show the times up reminder
			clearInterval(setIntervalId);//stop the rolling effect
		    $('#rollingBG')[0].pause();// pause the audio play
			checkWin();//check this turn is win or not
			$('#handlerUp').attr('src','handle_up.jpg');//show the handler up state
		},2000);
	})
	.on('mouseover',function(e){//mouse over handler event
		//just show the lean forward effect when handle_up 
		//in case trigger the mouseover effect when handle_down
		if($('#handlerUp').attr('src')=='handle_up.jpg'){
			$('#handlerUp').attr('src','handle_over.jpg');
		}		
	})
	.on('mouseleave',function(){//mouse leave handler event
		//change back to handle_up state from handle_over
		//if the mouse leave this handle
		if ($('#handlerUp').attr('src')=='handle_over.jpg') {
			$('#handlerUp').attr('src','handle_up.jpg');
		}
	})

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- functions -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

    // create a function to get random images for a dom element
    function getRandomImg(locationElement){
        let randomNum= Math.floor(Math.random()*3);//get a random int between 0-2
        // console.log(randomNum);//test for random num
        locationElement.attr('src',randomImg[randomNum]);//change this element's source to this random image
    }

    //create a function to check this turn is win or not
	function checkWin(){
		//If all three images are the same when the "spinning" is complete, the "try your luck!"
		if($('#slot1').attr('src') == $('#slot2').attr('src') && $('#slot2').attr('src') == $('#slot3').attr('src')){
		    console.log("You win");//show the win messege
			$('#machine_text').attr('src','display_win.jpg');//change the title imge to win state

            //The top graphic should return to "Try your luck!" after two seconds.
		    setTimeout(function(){
		    	$('#machine_text').attr('src','display_start.jpg');//change the title image back to original one
		    },2000);

		}
	}

})