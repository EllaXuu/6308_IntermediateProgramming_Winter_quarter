//question b
$(document).ready(function(){
	$('li').on('click',function(){
		var eachValue= $(this).text();
		alert ('The value of the item is: '+eachValue);
        console.log('The value of the item is: '+eachValue);
	})
})