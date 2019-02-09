/*//example 1

var str = "pet";

var body = d3.select("body");
var p = body.selectAll("p");

p.datum(str);

p.text(function(d, i){
    return i + " is binding with " + d;
});
*/
//example 2 
var dataset = ["My pet is a cat","My pet is a dog","My pet is a rabbit"];
var body = d3.select("body");
var p = body.selectAll("p");

p.data(dataset)

  .text(function(d, i){
      return d;
  });
  
  /*
// remove ()
var p = body.select("#myid");
p.remove();
*/