$(document).ready(function()//use Jquery
{
// get login & password from the user
(function() {
	var form = document.getElementById('hmwk5');
	
    $('#hmwk5').show();

	//task 2 when click button, then switch scenarios
	var login = document.getElementById('login');//connect the login radio button
	var newAcct = document.getElementById('newacct');//connect the New account radio button
	var guest = document.getElementById('guest');//connect the guest radio button
	var loginFields = document.getElementById('login_fields');//connect the login field
	var newLoginFields = document.getElementById('new_login_fields');//connect the new account field

    addEvent(login,'change',updateLogin);//add change event to login radio button
    addEvent(newAcct,'change',updateNewAcct);//add change event to the New account radio button
    addEvent(guest,'change',updateGuest);//add change event to the guest radio button

    //create a function to build a scenario when check the login radio
    //when click log in radio button
    // only show the login field
    function updateLogin(){
    	//clear the whole form first
    	// in case the existing information in the switch situation
    	form.reset();
		$('#login_fields').show();
        $('#new_login_fields').hide();
        $('#submit').hide();
    }

    //create a function to build a scenario when check the New Account radio
    //when click the New account radio button
    //only show the new account field
    function updateNewAcct(){

		$('#login_fields').hide();
        $('#new_login_fields').show();
        $('#submit').hide();
        $('.warningInfo').hide();
    }

    //create a function to build a scenario when check the guest radio
    //when click the guest radio button
    //leaving only the "Submit" button
    function updateGuest(){
		$('#login_fields').hide();
        $('#new_login_fields').hide();
        $('#submit').show();
    }
    
    //task 3
    var username = document.getElementById('username');//connect the username input
    var password = document.getElementById('pwd');//connect the password input
    var newUsername =document.getElementById('new_username');//connect the new username input
    var newPassword = document.getElementById('new_password');//connect the new password input
    var verifyPassword = document.getElementById('new_vpassword');//connect the verity password input
    //add handler to onkeyup event of all input box
    username.onkeyup = function(){checkEmpty();}
    password.onkeyup = function(){checkEmpty();}
    newUsername.onkeyup = function(){checkEmpty();}
    newPassword.onkeyup = function(){checkEmpty();}
    verifyPassword.onkeyup = function(){checkEmpty();}

    //create a function to check input informarion
    //If the user has typed something in all required fields
    //show the "Submit" button.
    //If any of the fields are emptied
    //hide the "Submit" button again
    function checkEmpty(){
    	//set the if statement when login checked 
    	if(login.checked){
    		if(username.value!="" && password.value!=""){
    	    // console.log("login, not empty");
    	    $('#submit').show();
    	    }
    	    else{
    	    $('#submit').hide();
    	    }
    	}
    	//set the if statement when new account radio checked 
    	else if (newAcct.checked){
        //If the user has typed something in all required fields
        //show the "Submit" button.
    		if (newUsername.value!=""&& newPassword.value!=""&& verifyPassword.value!=""){
    		$('#submit').show();

            //task 4
            //If both password fields have something filled in
            //compare the values in the two fields
            //If the values are not the same, put a red warning next to the password fields 
    		if (newPassword.value!=verifyPassword.value){
            $('.warningInfo').show();
    		}
    		else 
    		{
    		$('.warningInfo').hide();
    		}
    		}
    		//If any of the fields are emptied
            //hide the "Submit" button again
    		else
    		{$('#submit').hide();}
    	}
    }

    //task 5
    //If the user presses the "Submit" button
	addEvent(form, 'submit', function(e) {
		e.preventDefault();
		var elements = this.elements;
		//task 5a
		//If the user has selected "Log In", then clear away all the form fields and replace the form with a greeting on the page 
		if (login.checked){
		    let username = elements.username.value;
		    let msg = 'Welcome back, ' + username;
		    document.getElementById('hmwk5').textContent = msg;
		}
		//task 5b, the user has selected "New User"
		//then clear away all the form fields and replace the form with a message that says "Welcome, username!"
		else if (newAcct.checked){//task 5b
		    let msg = 'Welcome, ' + newUsername.value;
		    if (newPassword.value.length<=5){
		    	msg = msg + "\n CAUTION: Your password may not be very secure."
		    }
		    document.getElementById('hmwk5').innerText = msg; 

            //bonus 1, 6, Add this prompt to item 5b
            // add a button or a hyperlink that, when clicked, presents a new form
		    let changePassword =prompt("Hi "+newUsername.value,"Would you like to change your password now?");
		    if(changePassword){
		    	// $('#hmwk5').hide();//hide the original form
                $('#submitChangePwd').show();// show the new form
            }
		}
		//task 5c
		//If the user has selected "Continue as Guest", then clear away all the form fields and replace the form with a message that says "Welcome, Guest!"
		else if (guest.checked){
			//task 5c
			$('#hmwk5').hide();
			$('#guestReset').show();
			// document.getElementById('hmwk5').textContent="Welcome, Guest!";

			//bonus 2, task 7
			//Add this prompt to item 5c:
			//Then add a button or hyperlink that, when clicked, brings back up the original login/new account screen
		    let changePassword =prompt("Hi Guest!","Would you like to create an account now?");
		    if(changePassword){
                $('#updateGuest').show();// show the new form
            }
		}

	});
    
    //bonus 2, task 7
    //when clicked, brings back up the original login/new account screen
	$('#updateGuest').click(function(){	  
	    //reset the original form
		// document.getElementById("hmwk5").reset(); 
	    $('#guestReset').hide();
	    $('#updateGuest').hide();
	    $('#hmwk5').show();

		//default the New account radio checked
        newAcct.checked=true;
        //show the new account scenarios
        $('#new_login_fields').show();
        $('#submit').hide();
	})



    //bonus 1 task 6.b
    //connect the elements of the new form
    var oldAccPassword = document.getElementById('oldpwd');
    var newAccPassword = document.getElementById('newpwd');
    var verifyAccPwd = document.getElementById('verifypwd');
    //add onkeyup event for every input box
    oldAccPassword.onkeyup = function(){changePassword();}
    newAccPassword.onkeyup = function(){changePassword();}
    verifyAccPwd.onkeyup = function(){changePassword();}
    
    //create a function to check input information
    //and adjust the display
	function changePassword(){
		console.log("Changing Password");
        
        // bunus1, task 6.b
        // password checking
        // when three input boxes are not empty
        //show the submit button
        //else, hide the submit button
        if($('#oldpwd').val()!="" && $('#newpwd').val()!="" && $('#verifypwd').val()!=""){
        	$('#submitNewPassword').show();
            //when three input password are not same
            //show warning information
            //just check the new password and the verify password is enough
        	if($('#newpwd').val()!=$('#verifypwd').val()){
            $('.warningInfo').show();
			$('.wrongInfo').hide();
        	} 
        	else {
    		    $('.warningInfo').hide();
			    $('.wrongInfo').hide();
        	}
        }
        else {
        	$('#submitNewPassword').hide();
        }

	}
    
    //bonus task 6
    //when clicked, presents a new form
    $('#submitChangePwd').click(function(){
    	console.log("click to change ");
        $('#hmwk5').hide();
		$('#bonus').show();
        $('#submitChangePwd').remove();
    	// $('#changePassword').show();
    });


    //bonus 1, task 6.c
    //When the user clicks the submit button
    // check the "old password" against the password that the user entered when creating the account
    // If the old passwords are the same, 
    //remove the form fields and put up a message saying "Your password has been changed." 
    //If the old passwords are not the same, 
    //then put up a red message next to the "Old Password' field saying "Wrong Old Password"
	$('#submitNewPassword').click(function(){
    	console.log("click to update ");
		if (oldAccPassword.value== newPassword.value){
            
		    $('#bonus').remove();
			$('.changeInfo').show();
			$('#submitNewPassword').remove();
		}
		else {
			$('.wrongInfo').show();
		}
	})
	
}());

})