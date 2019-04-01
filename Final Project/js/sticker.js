$(document).ready(function(){
var hasMovingSticker = false;
var stickerList=[];
//create a object to store the elemnts of a sticker
class Sticker{
	constructor(){
		this.width="200px";
		this.height="200px";
		this.color="yellow";
	}
	//add a function about create a new sitcker
	createSticker() {
		console.log("create a new sticker.");
	let stickerItem = document.createElement('div');
    stickerItem.style.width=Sticker.width;
    stickerItem.style.height=Sticker.height;
    stickerItem.style.color=Sticker.color;

    stickerItem.setAttribute("class","stickerStyle");
    // $('body').append(stickerItem);//key only use jquery body to append, draggable can be used

    //add textarea, the img, the button to sticker
	var stickerTA = document.createElement('textarea');
    stickerTA.setAttribute("class","stickerTextarea");

    var dragImg = document.createElement('img');
    dragImg.className="thumbtack";
    dragImg.setAttribute('src','css/img/Thumbtack.png');
    // var dragImg=$('<img id ="thumbtack" src="img/Thumbtack.png">');
	var closeBtn = $('<button type="button" class="closebtn">X</button>');

	stickerItem.appendChild(stickerTA);
	stickerItem.appendChild(closeBtn[0]);
	stickerItem.appendChild(dragImg);
    $('#mainPage').append(stickerItem);//key only use jquery body to append, draggable can be used

    //add click event to the X buton
	$(stickerItem.childNodes[1]).on('click',function(event){
		console.log("delect this sticker");
		// stickerItem.removeChild(this.parentNode.parentNode);
		this.parentElement.remove();
	});
    //add mousedown, the mousemove, the mouseup events
	$(stickerItem).on('mousedown', dragSticker);
	$(window).on('mousemove', moveSticker);
	$(window).on('mouseup', dropSticker);
	}
    
}

//create a function to drag this sticker
function dragSticker (event){
	console.log("drag");
	//only drag the thumbtack img, then drag
	if(event.target.className.indexOf('thumbtack') != -1 && !this.moving){
		//change the clientX, the clientY and the position
	this.clientX = event.clientX;
	this.clientY = event.clientY; 
	this.style.left = this.clientX-72+'px';
	this.style.top = this.clientY+'px';
	this.moving = true;
		// this.style.cursor = 'pointer';
	hasMovingSticker = true;
	}
}

//create a function to move this sticker
function moveSticker (event){
	if(hasMovingSticker){
	var stickers = $('.stickerStyle');
	for(var i=0;i<stickers.length;i++){
		if(stickers[i].moving){
			event.preventDefault();
			//keep change the clientX the client Y and the position
			var newClientX = event.clientX;
			var newClientY = event.clientY;
			var left = parseInt(stickers[i].style.left) || 0;
			var top = parseInt(stickers[i].style.top) || 0;
			stickers[i].style.left = left + (newClientX - stickers[i].clientX) + 'px';
			stickers[i].style.top = top + (newClientY - stickers[i].clientY) + 'px';
			stickers[i].clientX = newClientX;
			stickers[i].clientY = newClientY;
		}
	}
}
}
//create a function to drop this sicker
function dropSticker(event){
	if(hasMovingSticker){
		var stickers = $('.stickerStyle');
		for(var i=0;i<stickers.length;i++){
			if(stickers[i].moving){
				//change the position 
				stickers[i].style.left = stickers[i].clientX = event.clientX;  
				stickers[i].style.top = stickers[i].clientY = event.clientY; 
				stickers[i].style.cursor = 'none';
				stickers[i].moving = false; 
			}
	}		
}}

//add click event to the button
$('#addMoreSticker').click(function(){
	console.log('add more stickers!');
	var asticker= new Sticker();
    asticker.createSticker();
    stickerList.push(asticker);
})


})