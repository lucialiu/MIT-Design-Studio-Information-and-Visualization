// PLOT 1

var width1 = d3.select('#mobile1').node().clientWidth; // graph spans entire width
var height1 = 310;	// graph has fixed height

var plot1 = d3.select('#plot1') // if we select a html id #name, if we select a class .name
	.append('svg')
	.attr('width', width1)
	.attr('height', height1)
	.attr('id', 'svg-graphic');

// for making horizontal lines
// actual line width = 15, actual gap = 50
var lineWidth = 6;
var gap = 18;
var r = gap/2;
var between = 90 - gap; // 84 is distance between icons
var edge = (width1 - (between * 3) - (gap * 4)) / 2;

// for making vertical lines
var maxDataHeight = height1/2;
var scaleHumidity = 1.0;
var scalePrecip = 1.0;
var scaleWind = 10;
var scaleTemp = 10;

// var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083'
var key = "6275e682a37fdfe567d0604a9d828f0e";

// d3 weather data
d3.json("data/boston_weather.json",draw);

function draw(error,data){

	// code
    $.ajax({
		url: 'https://api.darksky.net/forecast/' + key + '/42.361145,-71.057083',
		dataType: 'JSONP',
		type: 'GET',
		crossDomain: true,
		complete: function (data) {
			if (data.readyState == '4' && data.status == '200') {
				// console.log("This is TODAY's data.");
				// console.log(data.responseJSON);

				// weather icon
				var dailyIcon = data.responseJSON["daily"]["icon"];
				document.getElementById("weather-icon").innerHTML = "<img src='icons/weather/" + dailyIcon + ".svg'/>";

				// today's data
				var todayHumidity = data.responseJSON["daily"]["data"][0]["humidity"];
				var todayPrecip = data.responseJSON["daily"]["data"][0]["precipProbability"];
				var todayWind = data.responseJSON["daily"]["data"][0]["windSpeed"];
				var todayTempHi = data.responseJSON["daily"]["data"][0]["apparentTemperatureHigh"];
				var todayTempLo = data.responseJSON["daily"]["data"][0]["apparentTemperatureLow"];
				var todayTempAvg = (todayTempHi + todayTempLo) / 2;

				var currentTime = data.responseJSON["currently"]["time"];
				var yesterTime = currentTime - (60*60*24); // yesterday's time at 5AM

				$.ajax({
					url: 'https://api.darksky.net/forecast/' + key + '/42.361145,-71.057083,' + yesterTime,
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
							
							var diffHumidity = todayHumidity - yesterHumidity;
							var diffPrecip = todayPrecip - yesterPrecip;
							var diffWind = todayWind - yesterWind;
							var diffTempAvg = todayTempAvg - yesterTempAvg;
							
							var heightTemp = maxDataHeight * (diffTempAvg/scaleTemp);
							var heightPrecip =  maxDataHeight * (diffPrecip/scalePrecip);
							var heightHumidity = maxDataHeight * (diffHumidity/scaleHumidity);
							var heightWind = maxDataHeight * (diffWind/scaleWind);

							// determine upper or lower semicircle
							var a_T;
							var a_P;
							var a_H;
							var a_W;
							if (heightTemp > 0) {
								a_T = 1;
							} else if (heightTemp < 0) {
								a_T = 0;
							}
							if (heightPrecip > 0) {
								a_P = 1;
							} else if (heightPrecip < 0) {
								a_P = 0;
							}
							if (heightHumidity > 0) {
								a_H = 1;
							} else if (heightHumidity < 0) {
								a_H = 0;
							}
							if (heightWind > 0) {
								a_W = 1;
							} else if (heightWind < 0) {
								a_W = 0;
							}

							// draw path
							var svgGraphic = d3.select('#svg-graphic')
								.append('path')
								.attr('d', "M 0 " + height1/2 + " " + // START from middle y-axis
									"h " + edge +
									"v " + (-1 * heightTemp) +					// TEMPERATURE
									"a " + r + "," + r + " 0 1 " + a_T + " " + gap + ",0" +
									"v " + heightTemp +
									"h " + between +
									"v " + (-1 * heightPrecip) +
									"a " + r + "," + r + " 0 1 " + a_P + " " + gap + ",0" +
									"v " + heightPrecip +
									"h " + between +
									"v " + (-1 * heightHumidity) +
									"a " + r + "," + r + " 0 1 " + a_H + " " + gap + ",0" +
									"v " + heightHumidity +
									"h " + between +
									"v " + (-1 * heightWind) +
									"a " + r + "," + r + " 0 1 " + a_W + " " + gap + ",0" +
									"v " + heightWind +
									"h " + edge)
								.attr('stroke', 'black')
								.attr('stroke-width', lineWidth)
								.attr('stroke-linecap', 'round')
								.attr('stroke-linejoin', 'round')
								.attr('fill', "none");

						} else {
							console.log("DATA FETCH FAILED");
						}
					}
				});
			} else {
				console.log("DATA FETCH FAILED");
			}
		}
	});
}
