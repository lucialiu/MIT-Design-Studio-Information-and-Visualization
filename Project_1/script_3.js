var canvas3 = d3.select("#plot3").append("canvas").node();

canvas3.width = document.getElementById("plot3").clientWidth;

canvas3.height=document.getElementById("plot3").clientHeight;

//code to request the reload of the window --> we will use this to create animations
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

window.cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

setInterval(drawCanvas3,1000);
var newContext;

// create context
var ctx3 = canvas3.getContext("2d");

canvasWidth = 414;
canvasLength = 736;

function drawCanvas3() {

	if (newContext) {
		newContext.clearRect(0,0,canvasWidth,canvasLength);
	}	

	// GET TIME

	var d = new Date();
	hour = d.getHours();		// 0 - 23
	minute = d.getMinutes();	// 0 - 59
	second = d.getSeconds();	// 0 - 59

	secPerDay = 24*60*60;
	secPast = hour*60*60 + minute*60 + second;

	// MINUTE (old)

	// minPos = ((minute*60 + second)/(60*60)) * canvasLength;

	// ctx3.fillStyle = "#000000";
	// ctx3.globalAlpha = 0.5;
	// ctx3.fillRect(0,0,canvasWidth,minPos);

	// HOUR
	hourPos = secPast/secPerDay * canvasLength;
	hourThickness = 32;
	ctx3.fillStyle = "#000000";
	ctx3.globalAlpha = 1;
	ctx3.fillRect(0,hourPos-(hourThickness/2),canvasWidth,hourThickness);

	// MINUTE LINES

	thickness = 1.6;
	for (i = 0; i < minute; i++) {
		ctx3.fillStyle = "#ffffff";
		ctx3.fillRect(3.5+i*(canvasWidth/60.5),0,thickness,canvasLength);
	}

	newContext = ctx3;

}