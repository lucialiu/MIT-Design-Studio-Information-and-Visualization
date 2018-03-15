// PLOT TWO

var width2 = d3.select('#mobile2').node().clientWidth;
var height2 = d3.select('#mobile2').node().clientHeight;

// make simulated calendar data (my next week schedule)
var calendar = [0,0,0,0,0,0,1,1,1,1,0,0,0,
	0,0,1,0,0,0,1,0,1,0,1,1,0,
	0,0,0,0,1,0,0,0,1,0,0,1,0,
	0,0,1,0,0,0,0,1,0,1,0,0,0,
	0,0,0,0,1,0,0,0,0,0,1,1,0,
	0,1,1,1,1,1,0,0,0,0,1,0,0,
	1,0,1,0,0,1,1,0,1,0,0,0,0];

var rowNum = 13;
var	colNum = 7;
var startHour = 10;		// start at 11am for me!
var weatherVar = "apparentTemperature";

var colors = ["2e3192", "208bb9", "73bcdc", "b8dff0", "f5c37c", "f68d20", "f15a25", "c2272d"];
var range = [];
var loTemp = 20;
var tempRange = 5;	// not a good range practically, but makes winter in boston look pretty
for (i = 0; i < 7; i++) {
	range[i] = loTemp + (i * tempRange);
}

var allColors = [];
var chronTracker = [];
var chronColors = [];
var finalColors = [];

// var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083'
var key = "6275e682a37fdfe567d0604a9d828f0e";

// d3 weather data
d3.json("data/boston_weather.json",draw);

var date = new Date();
var day = date.getDay();	// Sunday is 0, Monday is 1, etc
var hour = date.getHours(); // 12am is 0 -> 11am is 11 -> 23

function draw(error,data){

	// console.log("CURRENT DATA")
	// console.log(data);

	$.ajax({
		url: 'https://api.darksky.net/forecast/' + key + '/42.361145,-71.057083',
		dataType: 'JSONP',
		type: 'GET',
		crossDomain: true,
		complete: function (data) {
			if (data.readyState == '4' && data.status == '200') {
				// console.log("This is TODAY's data.");
				// console.log(data.responseJSON);

				var currentTime = data.responseJSON["currently"]["time"];
				var weekTimes = [];
				for (i = 0; i < colNum; i++) {		// fill out week's times
					weekTimes[i] = currentTime + (i - day) * (60*60*24);
				}

				// WEEK - COLORS
				for (i = 0; i < colNum; i++) {
					$.ajax({
						url: 'https://api.darksky.net/forecast/' + key + '/42.361145,-71.057083,' + weekTimes[i],
						dataType: 'JSONP',
						type: 'GET',
						crossDomain: true,
						complete: function (data) {
							if (data.readyState == '4' && data.status == '200') {
								var hourlyWeather = [];
								var t = data.responseJSON["currently"]["time"];
								chronTracker.push(t, t, t, t, t, t, t, t, t, t, t, t, t);
								for (j = 0; j < rowNum; j++) {
									hourlyWeather[j]= data.responseJSON["hourly"]["data"][j + startHour][weatherVar];
								}
								for (j = 0; j < rowNum; j++) {
									var color;
									if (hourlyWeather[j] < range[0]) {
										color = colors[0];
									} else if (hourlyWeather[j] < range[1]) {
										color = colors[1];
									} else if (hourlyWeather[j] < range[2]) {
										color = colors[2];
									} else if (hourlyWeather[j] < range[3]) {
										color = colors[3];
									} else if (hourlyWeather[j] < range[4]) {
										color = colors[4];
									} else if (hourlyWeather[j] < range[5]) {
										color = colors[5];
									} else if (hourlyWeather[j] < range[6]) {
										color = colors[6];
									} else if (hourlyWeather[j] >= range[6]) {
										color = colors[7];
									}
									allColors.push(color);
								}
								for (k = 0; k < rowNum; k++) {
									fromLast = chronTracker.length - 13 + k;
									chronColors.push({'time': chronTracker[fromLast], 'color': allColors[fromLast]})
								};
								chronColors.sort(function(a,b) {
									return ((a.time < b.time) ? -1 : ((a.time == b.time) ? 0 : 1));
								});
								for (l = 0; l < chronColors.length; l++) {
									finalColors[l] = chronColors[l].color;
								}
								for (k = 0; k < allColors.length; k++) {
									if (calendar[k] == 0) {
										document.getElementById(k).innerHTML = "<img src='icons/colors/" + finalColors[k] + ".svg'/>";
									}
								}

								// TODAY - DOT
								if (hour >= startHour && hour <= (startHour+rowNum-1)) {
									var idNum = (day*rowNum) + (hour-startHour);
									if (finalColors[idNum] != null && calendar[idNum] == 0) {	// colored
										document.getElementById(idNum).innerHTML = "<img src='icons/colors/" + finalColors[idNum] + "-dot.svg'/>";
									} else if (finalColors[idNum] != null && calendar[idNum] == 1) {	// blank
										document.getElementById(idNum).innerHTML = "<img src='icons/colors/grey-circle.svg'/>";
									}
								}
							}
						}
					})
				}
			} else {
				console.log("DATA FETCH FAILED")
			}
		}
	})
}