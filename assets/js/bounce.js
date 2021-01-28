//---Variables
var doc    = document,
    box    = doc.querySelector("#main"),
    startX = 0,
    startY = 0,
    posX   = 0,
    posY   = 0,
    speedX = 0,
    speedY = 0,
    spd    = 5,
    mul    = .15,
    limit  = 45,
    obj    = {x: 0, y: 0, speedX: 0, speedY: 0};

//---Main Events
if(box){
box.addEventListener("mousedown", startMove);
box.addEventListener("touchstart", startMove);
doc.addEventListener("mouseup", stopMove);
box.addEventListener("touchend", stopMove);
}
//---Start the movement
function startMove (evt) {

  var touch = evt.touches || evt.targetTouches;
  
	startX = (touch) ? touch[0].pageX : evt.pageX;
	startY = (touch) ? touch[0].pageY : evt.pageY;

	//---Add the mouse move events
	doc.addEventListener("mousemove", updatePosition);
  box.addEventListener("touchmove", updatePosition);

}

//---Update variables
function updatePosition (evt) {
  
  var touch = evt.touches || evt.targetTouches;
  var pageX = (touch) ? touch[0].pageX : evt.pageX;
  var pageY = (touch) ? touch[0].pageY : evt.pageY;

	speedX = (pageX - posX) * spd;
	speedY = (pageY - posY) * spd;

	if (speedX < -limit) { speedX = -limit }
	if (speedX > limit) { speedX = limit }
	if (speedY < -limit) { speedY = -limit }
	if (speedY > limit) { speedY = limit }

	posX = pageX;
	posY = pageY;

	obj.x += (posX - startX - obj.x) * mul;
	obj.y += (posY - startY - obj.y) * mul;
	obj.speedX += (speedX - obj.speedX) * mul;
	obj.speedY += (speedY - obj.speedY) * mul; 

	updateTransform();

}

//---Stop movement, returns the box to its place
function stopMove () {

	TweenLite.to(obj, 0.75, {
		ease: Elastic.easeOut.config(1, 0.3),
		x: 0,
		y: 0,
		speedX: 0,
		speedY: 0,
		onUpdate: updateTransform
	});

	doc.removeEventListener("mousemove", updatePosition);

}

//---Update the box transformations
function updateTransform () {

	var transformStr = "translate(" + obj.x + "px, " + obj.y + "px) rotateX(" + (-obj.speedY) + "deg) rotateY(" + obj.speedX + "deg)";

	box.style.oTransform = transformStr;
	box.style.MozTransform = transformStr;
	box.style.MozTransform = transformStr;
	box.style.WebkitTransform = transformStr;
	box.style.transform = transformStr;

}
