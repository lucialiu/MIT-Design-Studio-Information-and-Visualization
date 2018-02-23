// find the canvas element by using id
var canvas1 = document.getElementById("plot1");

// get dimensions of canvas 1
// retina and new screens have very good resolutions. Canvases drawings might look a bit blurry in them.
// to avoid this problem we can scale the size of the canvas twice, and then scale back to normal in CSS
// this is not necessary
canvas1.width = 2 * document.getElementById("plot1").clientWidth;
canvas1.height = 2 * document.getElementById("plot1").clientHeight;
var canvas1RealWidth = document.getElementById("plot1").clientWidth;
var canvas1RealHeight = document.getElementById("plot1").clientHeight;

// create a drawing object (getContext)
var ctx1 = canvas1.getContext("2d");

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

// SKETCH 1
// center of the plot will be the center of our clock
var centerX = canvas1.width / 2;
var centerY = canvas1.height / 2;

//translate the center of the clock to the center of the plot
ctx1.translate(centerX, centerY);

// draw canvas 1

// in order to animate the clock we need to call the function in intervals
// in this case we will call it every second (1000 milliseconds)
ctx1.scale(2,2);
setInterval(drawCanvas1, 1000);

function drawCanvas1() {

    // outer radius of the clock
    var radius = 0.5 * (canvas1RealWidth / 2);

    // start drawing
    ctx1.beginPath();

    // determine style of the form
    ctx1.strokeStyle = "#000000";
    ctx1.strokeWidth = 2;
    ctx1.fillStyle = "000000"; // to paint over the previous drawing

    // arc() draws arcs
    // it needs 5 inputs arc(x,y,radius,startAngle,endAngle)
    // to create circles the starting angle must be 0 and the end angle must be 2*Math.PI
    // because we have translated our canvas to the center; the center of the clock is 0,0
    ctx1.arc(0, 0, radius, 0, 2 * Math.PI);

    // stroke your drawing
    ctx1.stroke();
    ctx1.fill();

    //end drawing
    ctx1.closePath();

    function drawHours(widthLine) {
        ctx1.save();
        ctx1.beginPath();

        ang = (h * 30) * Math.PI / 180;

        ctx1.lineWidth = widthLine;
        ctx1.strokeStyle = "#d4d4d4";
        ctx1.rotate(ang);
        ctx1.translate(0, -radius * 0.95);
        ctx1.moveTo(0, 0);
        ctx1.lineTo(0, 20); // Length of the line
        ctx1.stroke();
        ctx1.closePath();
        ctx1.restore();
    }

    // get current date and timing
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var context = canvas1.getContext('2d');

    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minutes * Math.PI / (6 * 60)) + (seconds * Math.PI / (360 * 60));
    drawHand(hour, radius * 0.5, 6, "#ffffff", "hour");

    //minute
    minutes = (minutes * Math.PI / 30) + (seconds * Math.PI / (30 * 60));
    drawHand(minutes, radius * 0.8, 4, "#ffffff", "minute");

    // second
    seconds = (seconds * Math.PI / 30);
    drawHand(seconds, radius * 0.9, 1.5, "#ffffff", "second");

    // the steps to draws the hands is the same for all of them
    // we can create a function, and then call it for each of the hands
    function drawHand(pos, length, width, color, type) {

        var centerX = Math.sin(pos) * radius * 0.75;
        var centerY = Math.cos(pos) * radius * -0.75;
        //context.clearRect(-canvas.width, -canvas.height, 2*canvas.width, 2*canvas.height);

        var circRadius = 10;

        if (type == "second") {
            circRadius = 5;
        } else if (type == "minute") {
            circRadius = 10;
        } else if (type == "hour") {
            circRadius = 15;
        }

        context.beginPath();
        context.arc(centerX, centerY, circRadius, 0, 2 * Math.PI, false);
        if (type == "second") {
            context.fillStyle = '#ffffff';
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#000000';
            context.stroke();
        } else if (type == "minute") {
            context.fillStyle = '#000000';
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#ffffff';
            context.stroke();
        } else if (type == "hour") {
            context.fillStyle = '#000000';
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#ffffff';
            context.stroke();
        }

    }

}




