
//create an application to trun the input number into charts by D3

var dataShown= [];// create a new array intend to store the showing numbers

//set event handler to button
d3.select("button")//connect to the button
  .on("click",function(){ // add event handler callback function
  	var dataString= d3.select("input").property("value"); //get the value of input box
    var dataList= dataString.split(","); // all string inputted in the input box will split by comma
    //send every number to the dataShown array
    for (i in dataList){ 
    	// if there is no input or input is not a number or negative number show an alert box
    	if(isNaN(dataList[i])||i ==""||Number(dataList[i])<0){
    		alert("Please input a non-negative number.");
    	    return;
    	}
        else{
         // for reasonable numbers, they will stored in the dataShown array
    	dataShown.push(Number(dataList[i]));
    }
    }
    turnNumToChart(dataShown); // call turnNumToChart() funtion to turn all numbers to charts in a svg canvas
 })

//create a function to turn every number of an array into a chart shown on a svg canvas
function turnNumToChart(dataShown){

/*-=-=-=-=-=-=-=-=-=-=-==-=-=-= initial data -=-=-=-=-=-=-=-=-=-=-=-=-=*/

//set the width, height, and padding space of a svg canvas
var widthOfSVG= 450;
var heightOfSVG= 400;
var paddingOfSVg= {left:50, right:50, top:25, bottom:25};
//set the padding space between rects
var rectPadding= 4;

/*-=-=-=-=-=-=-=-=-=-=-==-=-=-= set a svg canvas in D3 -=-=-=-=-=-=-=-=-=-=-=-=-=*/

//add a svg canvas to the body element of this html  
var svg= d3.select("body") //select the body element 
    .append("svg") // add a svg element
    .attr("width", widthOfSVG) // set the width propery of this svg
    .attr("height", heightOfSVG); // set the height propery of this svg

/*-=-=-=-=-=-=-=-=-=-=-==-=-=-= set the scale and axis -=-=-=-=-=-=-=-=-=-=-=-=-=*/
//reference:https://www.youtube.com/watch?v=iMYkVLWc3y0

//set the scale information of x axis
var xScale= d3.scale.ordinal() // because that all number are discrete
                                //so use the ordinal scale
    .domain(d3.range(dataShown.length)) // set the domain 
    .rangeRoundBands([0, widthOfSVG- paddingOfSVg.left- paddingOfSVg.right]); //set the range of this scale
    //.rangeRound([0, widthOfSVG- paddingOfSVg.left- paddingOfSVg.right]); //set the range of this scale

//set the scale information of y axis
var yScale= d3.scale.linear() // for y axis, use the linear scale
    .domain([0,d3.max(dataShown)])// set the domain of definition
    .range([heightOfSVG- paddingOfSVg.top- paddingOfSVg.bottom, 0]);// set the display range 

//set the x axis
var xAxis= d3.svg.axis()// use the d3.svg.axis() component to create the axis in svg
    .scale(xScale) // assign the xScale 
    .orient("bottom"); // point out the orientation way of this x-axis
                       // "button" means shown below the botton of x-axis

//set the y axis
var yAxis= d3.svg.axis()
    .scale(yScale)
    .orient("left");// means shown in the left of y-axis

/*-=-=-=-=-=-=-=-=-=-=-==-=-=-= add x-axis and y-axis to the svg -=-=-=-=-=-=-=-=-=-=-=-=-=*/

//add xAxis to svg canvas
svg.append("g")//using the group component to group all elements 
	.attr("class","axis") // set a class for css setting
	.attr("transform","translate("+paddingOfSVg.left + ","+(heightOfSVG-paddingOfSVg.bottom)+ ")")// set the location of xAxis
	.call(xAxis); 

//add yAxis to svg canvas
//reference:https://www.youtube.com/watch?v=TR39nfAW1dw
svg.append("g")
	.attr("class","axis")//set the same class of yAxis
	.attr("transform","translate("+paddingOfSVg.left + ","+paddingOfSVg.top+")")
	.call(yAxis);

/*-=-=-=-=-=-=-=-=-=-=-==-=-=-= add rectangle and text to the svg -=-=-=-=-=-=-=-=-=-=-=-=-=*/


//add rectangles in svg
var rects= svg.selectAll("rect")//
	.data(dataShown)// binding with the datashown array
	.enter()//point out using the enter part of the selection
	.append("rect")// add rectangle elements
	.attr("class","MyRect")// add a class for css setting
	.attr("transform","translate(" + paddingOfSVg.left + "," + paddingOfSVg.top + ")")//set the location
	.attr("x", function(d,i){
		return xScale(i)+rectPadding/2;
	} )
	.attr("width", xScale.rangeBand() - rectPadding )
	//add the animation effect on the vertical direction from 0 to d
	//reference:https://github.com/d3/d3-transition
	//reference: https://github.com/d3/d3-ease
	.attr("y",function(d){//set the initial state 
		var min = yScale.domain()[0];
		return yScale(min);
	})
	.attr("height", function(d){//set the initial state of height
		return 0;
	})
	.transition()// show a transition effect, in this case ,show y from 0 to d
	.delay(function(d,i){// set the delay time of the transition effect
		return i*200;// every i element will delay shown after i*200 ms
	})
	.duration(2000)// this transition effect will last 2s
	.ease("bounce")// the transition way will be bounce
	.attr("y",function(d){//set the final state of y
		return yScale(d);
	})
	.attr("height", function(d){//set the final state of height
		return heightOfSVG-paddingOfSVg.top-paddingOfSVg.bottom-yScale(d);
	});

//set all text elements
var texts = svg.selectAll(".text")
	.data(dataShown)
	.enter()
	.append("text")
	.attr("class","MyText")
	.attr("transform","translate(" + paddingOfSVg.left + "," + paddingOfSVg.top + ")")
	.text(function(d){//set the shown text
		return d;
	})
	.attr("x", function(d,i){// set the location of the text
		return xScale(i)+rectPadding/2;
	} )
	.attr("dx",function(){//set the shift location on the horizontal direction 
		return (xScale.rangeBand()-rectPadding)/2;
	})
	.attr("dy",function(d){//set the shift location on the vertical direction (reminder: downward)
		return 20;
	})
	//add the animation on the vertical direction
	.attr("y",function(d){//set the inital state
		var min = yScale.domain()[0];
		return yScale(min);
	})
	.transition() // show a transition effect, in this case ,show y from 0 to d
	.delay(function(d,i){// set the delay time of the transition effect
		return i * 200;// every i element will delay shown after i*200 ms
	})
	.duration(2000)// this transition effect will last 2s
	.ease("bounce")// the transition way will be bounce
	.attr("y",function(d){//set the final state
		return yScale(d);
	});
}