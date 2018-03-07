//plots

var margin1 = {t: 5, r: 40, b: 20, l: 30}; //this is an object
var width1 = d3.select('#mobile1').node().clientWidth - margin1.r - margin1.l,
    height1 = (d3.select('#mobile1').node().clientHeight / 4) - margin1.t - margin1.b;

var plot1 = d3.select('#plot1') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width1 + margin1.r + margin1.l)
    .attr('height', height1 + margin1.t + margin1.b);

var margin2 = {t: 0, r: 40, b: 20, l: 30}; //this is an object
var width2 = d3.select('#mobile1').node().clientWidth - margin2.r - margin2.l,
    height2 = (d3.select('#mobile1').node().clientHeight / 4) - margin2.t - margin2.b;

var plot2 = d3.select('#plot2') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width2 + margin2.r + margin2.l)
    .attr('height', height2 + margin2.t + margin2.b);

// var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083'

// d3 weather data
d3.json("data/boston_weather.json",draw);

function draw(error,data){

	// PLOT ONE

	// weather icon
    var dailyIcon = data["daily"]["icon"];
    document.getElementById("weather-icon").innerHTML = "<img src='icons/weather/" + dailyIcon + ".svg'/>";


    console.log("CURRENT DATA")
    console.log(data);

    var todayTime = data["currently"]["time"]; // today's time at 5AM

    $.ajax({
		url: 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083,' + todayTime,
		dataType: 'JSONP',
		type: 'GET',
		crossDomain: true,
		complete: function (data) {
			if (data.readyState == '4' && data.status == '200') {
				// console.log("This is TODAY's data.");
				// console.log(data.responseJSON);
				// today's data
				var todayHumidity = data.responseJSON["daily"]["data"][0]["humidity"];
				var todayPrecip = data.responseJSON["daily"]["data"][0]["precipProbability"];
				var todayWind = data.responseJSON["daily"]["data"][0]["windSpeed"];
				var todayTempHi = data.responseJSON["daily"]["data"][0]["apparentTemperatureHigh"];
				var todayTempLo = data.responseJSON["daily"]["data"][0]["apparentTemperatureLow"];
				var todayTempAvg = (todayTempHi + todayTempLo) / 2;
				// console.log(todayTempAvg);

				var yesterTime = todayTime - (60*60*24); // yesterday's time at 5AM

				$.ajax({
					url: 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083,' + yesterTime,
					dataType: 'JSONP',
					type: 'GET',
					crossDomain: true,
					complete: function (data) {
						if (data.readyState == '4' && data.status == '200') {
							// console.log("This is YESTERDAY's data.");
							// console.log(data.responseJSON);
							// yesterday's data
							var yesterHumidity = data.responseJSON["daily"]["data"][0]["humidity"];
							var yesterPrecip = data.responseJSON["daily"]["data"][0]["precipProbability"];
							var yesterWind = data.responseJSON["daily"]["data"][0]["windSpeed"];
							var yesterTempHi = data.responseJSON["daily"]["data"][0]["apparentTemperatureHigh"];
							var yesterTempLo = data.responseJSON["daily"]["data"][0]["apparentTemperatureLow"];
							var yesterTempAvg = (yesterTempHi + yesterTempLo) / 2;
							// console.log(yesterTempAvg);

							var diffHumidity = todayHumidity - yesterHumidity;
							var diffPrecip = todayPrecip - yesterPrecip;
							var diffWind = todayWind - yesterWind;
							var diffTempAvg = todayTempAvg - yesterTempAvg;
							// console.log(diffHumidity);
							// console.log(diffPrecip);
							// console.log(diffWind);
							// console.log(diffTempAvg);

							// used to scale graph variables
							var scaleHumidity = 1.0;
							var scalePrecip = 1.0;
							var scaleWind = 10;
							var scaleTemp = 10;




						} else {
							console.log("DATA FETCH FAILED")
						}
					}
				});

			} else {
				console.log("DATA FETCH FAILED")
			}
		}
	});

	// PLOT TWO


	// var rowNum = 13;
	// var	colNum = 7;

	// for (i = 0; i < rowNum; i++) {
	// 	for (j = 0; j < colNum; j++) {
	// 		var name = "r"+(rowNum+1)+"c"+(colNum+1);
	// 		console.log(name);
	// 		document.getElementById("r"+(rowNum+1)+"c"+(colNum+1)).innerHTML = "<img src='icons/umbrella.svg'/>";
	// 	}
	// }

}
