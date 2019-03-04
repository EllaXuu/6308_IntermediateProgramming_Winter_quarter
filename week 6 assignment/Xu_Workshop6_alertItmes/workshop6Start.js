
//method 1
//click the button 
//then alert every items one by one
// $(document).ready(function(){
// 	$("button").click(function(){
// 		$('li').each(function(){
// 			var eachValue = $(this).text();
// 			alert ('The value of the item is: '+eachValue);
// 			console.log('The value of the item is: '+eachValue);
// 		})
// 	})
// })

//method 2
//click the button 
//then alert every items one by one
//with the index number
$(document).ready(function(){
	$("button").click(function(){
		$('li').each(function(i, e){

			var eachValue = $(e).text();
			alert ('The value of the '+i+ ' item is: '+eachValue);
			console.log('The value of the '+i+ ' item is: '+eachValue);
		})
	})
})

