$(function() {

  // SETUP
  var $list, $newItemForm, $newItemButton;
  var item = '';                                 // item is an empty string
  $list = $('ul');                               // Cache the unordered list
  $newItemForm = $('#newItemForm');              // Cache form to add new items
  $newItemButton = $('#newItemButton');          // Cache button to show form

  // $('li').hide().each(function(index) {          // Hide list items
  //   $(this).delay(450 * index).fadeIn(1600);     // Then fade them in
  // });

  //task 1.
  //all of the list items fade in at the same time over a period of half a second
  $('li').hide().fadeIn(500);

  // ITEM COUNTER
  function updateCount() {                       // Create function to update counter
  
  
  // WRITE YOUR LOGIC HERE
      var items = $('li[class!=complete]').length;
      $('#counter').text(items);
  
  
  }
  updateCount();                                 // Call the function

  // SETUP FORM FOR NEW ITEMS
  $newItemButton.show();                         // Show the button
  $newItemForm.hide();                           // Hide the form
  $('#showForm').on('click', function() {        // When click on add item button
    $newItemButton.hide();                       // Hide the button
    $newItemForm.show();                         // Show the form
  });

  // ADDING A NEW LIST ITEM
  $newItemForm.on('submit', function(e) {       // When a new item is submitted
                  
        e.preventDefault();// Prevent form being submitted
        // Get value of text input
        // Add item to end of the list
        // Empty the text input
        // Update the count
        
        //task 5
        //checks to see if the form value being submitted is blank. 
        //and adjust the placeholder text
        var text = $('input:text').val();
        if(text==''){
          $('#itemDescription').attr("placeholder", "Seriously, add a description");
          return;
        }
        else{
          $list.append('<li>' + text + '</li>'); // first add the item to the list
          $('input:text').val(''); // now that we are done with it, empty the text input
          $('#itemDescription').attr("placeholder", "Add description");
          updateCount();  
        }         
  });

  var count=0;//count the click numbers
  // CLICK HANDLING - USES DELEGATION ON <ul> ELEMENT
  $list.on('click', 'li', function() {
    var $this = $(this);               // Cache the element in a jQuery object
    var complete = $this.hasClass('complete');  // Is item complete

    if (complete === true) {           // Check if item is complete
        //task 4.
        count++;
        // console.log(count);
        //a second click on the completed item will remove the item from the list,
        if(count==2){
           // If so, animate opacity + padding
           // Use callback when animation completes
           // Then completely remove this item
           
           $this.animate ({
               opacity: 0.0,
               paddingLeft: '+=180'        
             }, 500, 'swing', function() {
               $this.remove();
             });
           count=0;//clear this count
        }
     
    } else {                           // Otherwise indicate it is complete
      item = $this.text();             // Get the text from the list item
      $this.remove();                  // Remove the list item
      $list                            // Add back to end of list as complete
        .append('<li class=\"complete\">' + item + '</li>')
        .hide().fadeIn(300);           // Hide it so it can be faded in
      updateCount();                   // Update the counter
      //task 2.
      //handles an element that has been marked "completed" so that the bar is a uniform gray color
      $('.complete').css("background-color", "#7d7d7d");
    }                                  // End of else option

  });                                  // End of event handler



});