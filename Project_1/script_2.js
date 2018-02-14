var canvas2 = d3.select("#plot2").append("canvas").node();

canvas2.width = document.getElementById("plot2").clientWidth;

canvas2.height = document.getElementById("plot2").clientHeight;

// code to request the reload of the window --> we will use this to create animations
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

setInterval(drawCanvas2, 1000);
var lineContext;

// create context
var ctx2 = canvas2.getContext("2d");

canvasWidth = 414;
canvasLength = 736;

function drawCanvas2() {

	if (lineContext) {
		lineContext.clearRect(0,0,canvasWidth,canvasLength);
	}

	// GET TIME

	var d = new Date();
	hour = d.getHours();		// 0 - 23
	minute = d.getMinutes();	// 0 - 59
	second = d.getSeconds();	// 0 - 59

	secPerDay = 24*60*60;
	secPast = hour*60*60 + minute*60 + second;

	// SECOND LINE

	secThickness = 1;
	secPos = second/60 * canvasWidth;

	ctx2.fillStyle = "#000000";
	ctx2.fillRect(secPos,0,secThickness,canvasLength);

	// HOUR LINE

	hourThickness = 2;
	hourPos = secPast/secPerDay * canvasLength;

	ctx2.fillStyle = "#000000";
	ctx2.fillRect(hourPos,0,hourThickness,canvasLength);

	// // MINUTE LINE

	// minThickness = 2;
	// minPos = ((minute*60 + second)/(60*60)) * canvasWidth;

	// ctx2.fillStyle = "#000000";
	// ctx2.fillRect(minPos,0,minThickness,canvasLength);

	// MINUTE CIRCLE

	minPosVert = ((minute*60 + second)/(60*60)) * canvasLength;
	var centerX = hourPos;
	var centerY = minPosVert;
	var radius1 = 10;

	// ctx2.beginPath();
	// ctx2.arc(centerX, centerY, radius1, 0, 2 * Math.PI, false);
	// ctx2.fillStyle = '#ffffff';
	// ctx2.fill();
	// ctx2.lineWidth = 2;
	// ctx2.strokeStyle = '#000000';
	// ctx2.stroke();

	radius2 = 5;

	ctx2.beginPath();
	ctx2.arc(centerX+1, centerY, radius2, 0, 2 * Math.PI, false);
	ctx2.fillStyle = '#000000';
	ctx2.fill();
	ctx2.lineWidth = 1;
	ctx2.strokeStyle = '#000000';
	ctx2.stroke();


	lineContext = ctx2;

}