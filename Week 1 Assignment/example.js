// Create variables for the welcome message
var greeting = 'Howdy ';
var name = 'Molly';
var message = ', please check your order:';
// Concatenate the three variables above to create the welcome message
var welcome = greeting + name + message;
//Create variables to take the bonus sign messege
var sign ="Montague House September Space Sale!"

/*-=-=-=-=-=-=-=-=-=-=-=-=-= calculate the tile number of the sign -=-=-=-=-=-=-=-=-=-=-=*/

//Create a variable to store the number of spaces in the sign string
var spaceNum=0;
//Create a variable to store the space location index in the sign string 
//When find the first space in the sign string then sent the index num to signSpace
var signSpace=sign.indexOf(" ");
//Set a loop to count how many spaces during the sign string
//when the sign string has a space then execute the loop
while(signSpace!=-1){
	//count the space number
	spaceNum++;
    //search again start from the place next to the first space location
	signSpace=sign.indexOf(" ",signSpace+1);
}
//Create a variable to store the length number of the sign without the space number
var tiles= sign.length-spaceNum;

/*-=-=-=-=-=-=-=-=-=-=-= set new varables tileType and pricePerTile -=-=-=-=-=-=-=-=-=-=*/

//Create a variable to store what kind of tile the customer wants the sign made of.
var tileType="stone";
//Create a variable to store the per price depends on different tile type
var pricePerTile;
//Add a conditional test to check the "tiletype" and set different per-price for each type
if(tileType=="stone"){
	pricePerTile=10;}
  else if (tileType=="clay"){
  	pricePerTile=5; }
  else if (tileType=="wood"){
  	pricePerTile=7;}

/*-=-=-=-=-=-=-=-=-=-=-= set Subtotal, shipping, and Grand total  -=-=-=-=-=-=-=-=-=-=-=*/

//Create variables to hold details about other tags 
var subTotal = tiles * pricePerTile;
var shipping = 7;
var grandTotal = subTotal + shipping;

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= output part -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

// Get the element that has an id of perPriceTile.
var elPricePertile =document.getElementById('perPriceTile');
// Replace the content of that element with the personalized per tile type and single price message
elPricePertile.textContent='('+tileType+')'+' $'+pricePerTile;

// Get the element that has an id of greeting
var el = document.getElementById('greeting');
// Replace the content of that element with the personalized welcome message
el.textContent = welcome;

// Get the element that has an id of userSign then update its contents
var elSign = document.getElementById('userSign');
elSign.textContent = sign;

// Get the element that has an id of tiles then update its contents
var elTiles = document.getElementById('tiles');
elTiles.textContent = tiles;

// Get the element that has an id of subTotal then update its contents
var elSubTotal = document.getElementById('subTotal');
elSubTotal.textContent = '$' + subTotal;

// Get the element that has an id of shipping then update its contents
var elShipping = document.getElementById('shipping');
elShipping.textContent = '$' + shipping;

// Get the element that has an id of grandTotal then update its contents
var elGrandTotal = document.getElementById('grandTotal');
elGrandTotal.textContent = '$' + grandTotal;

// Note: textContent does not work in IE8 or earlier - see explanation on website
