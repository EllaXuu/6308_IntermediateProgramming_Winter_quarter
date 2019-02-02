# 6308-Winter-quarter
Assignment and workshop files

Week 1: HTML, CSS, JavaScript Structure
Including:
Learning Objectives
By the end of the week, you will have the opportunity to:

a.HTML & CSS Review

b.JavaScript Intro – creating a simple script

c.Variables, Strings, Arrays


Personal Notes:
How to delete spaces in a string.
1. indexof()
var spaceNum=0;
var signSpace= sign.indexOf(" ");
while(signSpace!=-1){
spaceNum++;
signSpace = sign.indexOf(" ", signSpace +1);}

2. chatAt();
let count=0;
for(let i=0; i<sign.length; i++)
{
if(sign.charAt(i)!==" "){
count++;
}
}

3. const tiles = sign.replace(/\s/g,' ').length;
