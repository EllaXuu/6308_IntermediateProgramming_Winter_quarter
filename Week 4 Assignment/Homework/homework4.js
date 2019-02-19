// 4 ERRORS IN THE VARIABLE INITIALIZATIONS

//1.Error: A wrong way to create an array. 
// This sentence misses a "," between the last two elements.
// That will cause fail to initialize myArray 
var myArray=['first','second','third'];
//2.Error: A wrong way to define a key:value pair when creating an object
//This sentence misses a underscore between "first" and "thing"
//That will cause fail to initialize myObject 
var myObject = {first_thing:'1st', second_thing:'2nd', third_thing: '3rd'}; 
var i;
//3. A wrong way to use Document's method and that will cause fail to call this method
// The right way to use this method is "document.getElementById(id)".
var element1 = document.getElementById('first');
//4. A wrong way to use Document's method and that will cause fail to call this method
// It should be "getElementById" instead of "getElementbyId"
var element2 = document.getElementById(2);

// 1 ERROR IN THE FUNCTION

// 5. add the "}" at the end of this function
// This function is not finished because it misses a "}" at the ending 
// that will cause the "Unexpected string" error 
function appendWithComma(string1, string2) {
    string1 = string1 + ", " + string2;
    return string1;
}

// 3 ERRORS IN THE LOOP

// According to the final output: "third, first"
// because of the comma location shown in this cell
// The output order should be run the "if block" once first
// and then run the else block once 
for (i = myArray.length-1; i >= 0; i = i -2) {//6 change "i = myArray.length" to "i=myArray.length-1"
                                              //In the output,for "third", its index number should be myArray.length-1
                                              //so the for statement should execute from i = myArray.length-1;
                                              //7 change "i>0" to "i>=0"
                                              //for "first", its index number is 0, so the condition statement should include the 0.
    if (element1.textContent.length == 0) {// 8. change "=" to "=="
                                           // In if statement, when judge if a value equal to 0 use "==" instead of "="
        element1.textContent = myArray[i];
    } else {
        element1.textContent = appendWithComma(element1.textContent, myArray[i]);
    }
}


// 2 ERRORS IN THE LOOP
for (i in myObject) {
    if (element2.textContent.length > 0) {//9. change "element2.textContent" to "element2.textContent.length"
                                          //0 should be compared with element2. textContent.length (a number) instead of element2. textContent (a string)
                                          // the original condition will cause this if block never run
        element2.textContent = appendWithComma(element2.textContent, myObject[i]);
    } else {
        element2.textContent = myObject[i];//10. A wrong way to get a value by index number
                                           //should change i to [i]
    }
}
