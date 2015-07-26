/*** Definition of variables ***/
var icons = {
	"clear-day" : "B", 
	"clear-night" : "C", 
	"rain" : "R", 
	"snow" : "G", 
	"sleet" : "X", 
	"wind" : "S", 
	"fog" :"N", 
	"cloudy" : "Y",
	"partly-cloudy-day" : "H", 
	"partly-cloudy-night" : "I"
};

var recommendations = {
	"clear-day" : "Take a bike ride downtown!", 
	"clear-night" : "Go count the stars!", 
	"rain" : "Bring your umbrella if you're going out!", 
	"snow" : "Break in your snow boots!", 
	"sleet" : "It's slippery out, watch out!", 
	"wind" : "Make sure you bring your wind jacket!", 
	"fog" :"Be careful while driving!", 
	"cloudy" : "Don't worry about getting a sun tan, you won't!",
	"partly-cloudy-day" : "Who likes partly-cloudy-days?", 
	"partly-cloudy-night" : "Don't bother using your telescope..."
};

var cities = {	
	"new york" 		: 	{coords: {latitude: 40.672060, longitude:-73.983898}},
	"los angeles" 	: 	{coords: {latitude: 34.101422, longitude: -118.341224}},
	"chicago" 		: 	{coords: {latitude: 41.879003, longitude: -87.63675}},
	"san francisco" : 	{coords: {latitude: 37.788531, longitude: -122.407237}},
	"miami" 		:	{coords: {latitude: 25.790176, longitude: -80.140133}},
	"denver" 		:	{coords: {latitude: 39.739150, longitude: -104.98470}},
	"boston" 		:	{coords: {latitude: 42.358430, longitude: -71.059770}},
	"houston" 		:	{coords: {latitude: 29.763280, longitude: -95.363270}},
	"philadelphia" 	:	{coords: {latitude: 39.952340, longitude: -75.163790}},
	"phoenix" 		:	{coords: {latitude: 33.448380, longitude: -112.07404}},
	"san antonio"	:	{coords: {latitude: 29.424120, longitude: -98.493630}},
	"san diego"		:	{coords: {latitude: 32.715330, longitude: -117.15726}},
	"dallas" 		:	{coords: {latitude: 32.783060, longitude: -96.806670}},
	"san jose" 		:	{coords: {latitude: 37.339390, longitude: -121.89496}}
 };

var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

/*** Definition of functions ***/				 
function direction(angle) {
	if (angle >= 0 && angle < 90) {
		return "NE";
	} else if (angle >= 90 && angle < 180) {
		return "SE";
	} else if (angle >= 180 && angle < 270) {
		return "SW";
	} else if (angle >=270 && angle < 360) {
		return "NW";
	}
} 

function hoursAndMinutes (unixtime) {
	var hours = unixtime.getHours();
	if (hours<10) {
		hours = "0" + hours.toString();
	}
	var minutes = unixtime.getMinutes();
	if (minutes<10) {
		minutes = "0" + minutes.toString();
	}
	var hrsAndMns = hours + ":" + minutes;
	return hrsAndMns;
}

/*** Functions for Index.html ***/
function loadBasic(cityCoords) {
	var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;

	var forecastURL ="https://api.forecast.io/forecast/2db00ee1ac3c9d37be124f62c67bb9f8/" + latlng;

	$.ajax({
		url: forecastURL,
		jsonpCallback: 'jsonCallback',
		async: true,
		contentType: "application/json",
		dataType: 'jsonp',
		method: 'GET',
		success: function(json) {
			$("#current_temp").html(Math.round(json.currently.temperature)+"&#176;F"); //this changes the content of the current temperature
			$("#current_summary").html(json.currently.summary); //changes the summary description
			$("#current_temp").attr("data-icon",icons[json.currently.icon]); // changes the icon before the temperature
			var windInfo=json.currently.windSpeed.toFixed(1) + " MPH " + direction(json.currently.windBearing);
			$("#wind").html(windInfo);
			var humidLevel = Math.round(json.currently.humidity*100);
			$("#humid").html(humidLevel + "% Humid");
			var recommText = '"' + recommendations[json.currently.icon] + '"';
			$("#recomm").html(recommText);
		},
		error: function(e) {
			console.log(e.message);
		}
	});
} // this gives the weather info of a city with its coordinates

function loadCityBasic(city) {
	$("#location").html(city); // changes the description of location to the input city in the content area

	if (city.toLowerCase() == "current location") {
		if (navigator.geolocation) { //this is an HTML5 API and lets you know if the browser has the capability to access the geolocation
			navigator.geolocation.getCurrentPosition(loadBasic,loadDefaultCityBasic); 
			// if succesful the getCurrentPosition method returns an object, where the first 2 key values are coords.latitude and coords.longitude, and then that 
			//object will be the parameter of loadBasic, so it will work
		} else {
			loadDefaultCityBasic(); // if your browser doesn't have the capabilities yóu'll see Denver weather
		}
	} else{
		loadBasic(cities[city.toLowerCase()]); // will run the loadBasic function and will update all weather basic info for that city
	}
}

function loadDefaultCityBasic() {
	loadCityBasic("Denver");
}

/*** Functions for Detailed page ***/
function loadDetailed(cityCoords) {
	var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;

	var forecastURL ="https://api.forecast.io/forecast/2db00ee1ac3c9d37be124f62c67bb9f8/" + latlng;

	$.ajax({
		url: forecastURL,
		jsonpCallback: 'jsonCallback',
		async: true,
		contentType: "application/json",
		dataType: 'jsonp',
		method: 'GET',
		success: function(json) {
			$("#feels").html("Feels like: " + Math.round(json.currently.apparentTemperature) + "&#176;F"); //this changes the content of the feeling temperature
			$("#precipitation").html("Precipitation: " + json.currently.precipIntensity + " in/hr"); //changes the precipitation description
			$("#pressure").html("Pressure: " + Math.round(json.currently.pressure) + " mbar"); // changes the pressure description
			$("#visibility").html("Visibility: " + Math.round(json.currently.visibility) + " miles");
			$("#cloudCover").html("Cloud Cover: " + Math.round((json.currently.cloudCover)*100) + "%");
			$("#nearestStorm").html("Nearest Storm: " + Math.round(json.currently.nearestStormDistance) + " miles " + direction(json.currently.windBearing));
			$("#chanceRain").html("Chance of Rain: " + (json.currently.precipProbability)*100 + "%");
			$("#dewPoint").html("Dew Point: " + Math.round(json.currently.dewPoint) + "&#176;F");
			$("#ozone").html("Ozone Density: " + Math.round(json.currently.ozone) + " Dobson Units");
			
			var sunriseDate = new Date((json.daily.data[0].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[0].sunsetTime)*1000);
			$("#sunrise").html("Sunrise: " + hoursAndMinutes(sunriseDate));
			$("#sunset").html("Sunset: " + hoursAndMinutes(sunsetDate));

			$("#moonPhase").html("Moon Phase: " + (json.daily.data[0].moonPhase)*100 + "%");
		},
		error: function(e) {
			console.log(e.message);
		}
	});
}

function loadCityDetailed(city) {
	$("#locationDetailed").html(city); // changes the description of location to the input city in the content area

	if (city.toLowerCase() == "current location") {
		if (navigator.geolocation) { //this is an HTML5 API and lets you know if the browser has the capability to access the geolocation
			navigator.geolocation.getCurrentPosition(loadDetailed,loadDefaultCityDetailed); 
			// if succesful the getCurrentPosition method returns an object, where the first 2 key values are coords.latitude and coords.longitude, and then that 
			//object will be the parameter of loadBasic, so it will work
		} else {
			loadDefaultCityDetailed(); // if your browser doesn't have the capabilities yóu'll see Denver weather
		}
	} else{
		loadDetailed(cities[city.toLowerCase()]); // will run the loadBasic function and will update all weather basic info for that city
	}
}

function loadDefaultCityDetailed() {
	loadCityDetailed("Denver");
}

/*** Functions for Forecast page ***/
function loadForecast(cityCoords) {
	var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;

	var forecastURL ="https://api.forecast.io/forecast/2db00ee1ac3c9d37be124f62c67bb9f8/" + latlng;

	$.ajax({
		url: forecastURL,
		jsonpCallback: 'jsonCallback',
		async: true,
		contentType: "application/json",
		dataType: 'jsonp',
		method: 'GET',
		success: function(json) {
			$("#summToday").html(json.daily.data[0].summary); 
			$("#tempToday").html("Low - High Temperature: " + Math.round(json.daily.data[0].temperatureMin) + " - " + Math.round(json.daily.data[0].temperatureMax) + "&#176;F"); 
			$("#rainToday").html("Chance of Rain: " + (json.daily.data[0].precipProbability)*100 + "%"); 
			$("#precToday").html("Average Precipitation: " + json.daily.data[0].precipIntensity + " in/hr");				
			var sunriseDate = new Date((json.daily.data[0].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[0].sunsetTime)*1000);
			$("#sunToday").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			$("#summ1").html(json.daily.data[1].summary); 
			$("#temp1").html("Low - High Temperature: " + Math.round(json.daily.data[1].temperatureMin) + " - " + Math.round(json.daily.data[1].temperatureMax) + "&#176;F"); 
			$("#rain1").html("Chance of Rain: " + (json.daily.data[1].precipProbability)*100 + "%"); 
			$("#prec1").html("Average Precipitation: " + json.daily.data[1].precipIntensity + " in/hr");				
			var sunriseDate = new Date((json.daily.data[1].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[1].sunsetTime)*1000);
			$("#sun1").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			// var forecastDate = new Date((json.daily.data[2].time)*1000);
			// $("#two").html(weekDays[forecastDate.getDay()]);
			$("#summ2").html(json.daily.data[2].summary); 
			$("#temp2").html("Low - High Temperature: " + Math.round(json.daily.data[2].temperatureMin) + " - " + Math.round(json.daily.data[2].temperatureMax) + "&#176;F"); 
			$("#rain2").html("Chance of Rain: " + (json.daily.data[2].precipProbability)*100 + "%"); 
			$("#prec2").html("Average Precipitation: " + json.daily.data[2].precipIntensity + " in/hr");				
			var sunriseDate = new Date((json.daily.data[2].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[2].sunsetTime)*1000);
			$("#sun2").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			// var forecastDate = new Date((json.daily.data[3].time)*1000);
			// $("#three").html(weekDays[forecastDate.getDay()]);
			$("#summ3").html(json.daily.data[3].summary); 
			$("#temp3").html("Low - High Temperature: " + Math.round(json.daily.data[3].temperatureMin) + " - " + Math.round(json.daily.data[3].temperatureMax) + "&#176;F"); 
			$("#rain3").html("Chance of Rain: " + (json.daily.data[3].precipProbability)*100 + "%"); 
			$("#prec3").html("Average Precipitation: " + json.daily.data[3].precipIntensity + " in/hr");				
			var sunriseDate = new Date((json.daily.data[3].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[3].sunsetTime)*1000);
			$("#sun3").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			// var forecastDate = new Date((json.daily.data[4].time)*1000);
			// $("#four").html(weekDays[forecastDate].getDay());
			$("#summ4").html(json.daily.data[4].summary); 
			$("#temp4").html("Low - High Temperature: " + Math.round(json.daily.data[4].temperatureMin) + " - " + Math.round(json.daily.data[4].temperatureMax) + "&#176;F"); 
			$("#rain4").html("Chance of Rain: " + (json.daily.data[4].precipProbability)*100 + "%"); 
			$("#prec4").html("Average Precipitation: " + json.daily.data[4].precipIntensity + " in/hr");				
			var sunriseDate = new Date((json.daily.data[4].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[4].sunsetTime)*1000);
			$("#sun4").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			// var forecastDate = new Date((json.daily.data[5].time)*1000);
			// $("#five").html(weekDays[forecastDate].getDay());
			$("#summ5").html(json.daily.data[5].summary); 
			$("#temp5").html("Low - High Temperature: " + Math.round(json.daily.data[5].temperatureMin) + " - " + Math.round(json.daily.data[5].temperatureMax) + "&#176;F"); 
			$("#rain5").html("Chance of Rain: " + (json.daily.data[5].precipProbability)*100 + "%"); 
			$("#prec5").html("Average Precipitation: " + json.daily.data[5].precipIntensity + " in/hr");				
			var sunriseDate = new Date((json.daily.data[5].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[5].sunsetTime)*1000);
			$("#sun5").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			// var forecastDate = new Date((json.daily.data[6].time)*1000);
			// $("#six").html(weekDays[forecastDate].getDay());
			$("#summ6").html(json.daily.data[6].summary); 
			$("#temp6").html("Low - High Temperature: " + Math.round(json.daily.data[6].temperatureMin) + " - " + Math.round(json.daily.data[6].temperatureMax) + "&#176;F"); 
			$("#rain6").html("Chance of Rain: " + (json.daily.data[6].precipProbability)*100 + "%"); 
			$("#prec6").html("Average Precipitation: " + json.daily.data[6].precipIntensity + " in/hr");				
			var sunriseDate = new Date((json.daily.data[6].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[6].sunsetTime)*1000);
			$("#sun6").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			// var forecastDate = new Date((json.daily.data[7].time)*1000);
			// $("#seven").html(weekDays[forecastDate].getDay());
			$("#summ7").html(json.daily.data[7].summary); 
			$("#temp7").html("Low - High Temperature: " + Math.round(json.daily.data[7].temperatureMin) + " - " + Math.round(json.daily.data[7].temperatureMax) + "&#176;F"); 
			$("#rain7").html("Chance of Rain: " + (json.daily.data[7].precipProbability)*100 + "%"); 
			$("#prec7").html("Average Precipitation: " + json.daily.data[7].precipIntensity + " in/hr");				
			var sunriseDate = new Date((json.daily.data[7].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[7].sunsetTime)*1000);
			$("#sun7").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var dataTempMin = [
		            Math.round(json.daily.data[1].temperatureMin),
		            Math.round(json.daily.data[2].temperatureMin),
		            Math.round(json.daily.data[3].temperatureMin),
		            Math.round(json.daily.data[4].temperatureMin),
		            Math.round(json.daily.data[5].temperatureMin),
		            Math.round(json.daily.data[6].temperatureMin),
		            Math.round(json.daily.data[7].temperatureMin)
		    ];

		    var dataTempMax = [
		            Math.round(json.daily.data[1].temperatureMax),
		            Math.round(json.daily.data[2].temperatureMax),
		            Math.round(json.daily.data[3].temperatureMax),
		            Math.round(json.daily.data[4].temperatureMax),
		            Math.round(json.daily.data[5].temperatureMax),
		            Math.round(json.daily.data[6].temperatureMax),
		            Math.round(json.daily.data[7].temperatureMax)
		    ];

		    var barChartData = {
			    labels: ["+1", "+2", "+3", "+4", "+5", "+6", "+7"],
			    datasets: [
			        {
			            label: "Lowest Temperature",
			            fillColor: "rgba(220,220,220,0.5)",
			            strokeColor: "rgba(220,220,220,0.8)",
			            highlightFill: "rgba(220,220,220,0.75)",
			            highlightStroke: "rgba(220,220,220,1)",
			            data: dataTempMin
			        },
			        {
			            label: "Highest Temperature",
			            fillColor: "rgba(151,187,205,0.5)",
			            strokeColor: "rgba(151,187,205,0.8)",
			            highlightFill: "rgba(151,187,205,0.75)",
			            highlightStroke: "rgba(151,187,205,1)",
			            data: dataTempMax
			        }
			    ] 
			}; //end of barChartData

			var ctx = document.getElementById("canvas").getContext("2d");
			window.myBar = new Chart(ctx).Bar(barChartData, {
				responsive : true,
				scaleShowVerticalLines: false
			});
		}, //end of success

		error: function(e) {
			console.log(e.message);
		} //end of error

	}); //end of Ajax call
} //end of function LoadForecast

function loadCityForecast(city) {
	$("#locationForecast").html(city); // changes the description of location to the input city in the content area

	if (city.toLowerCase() == "current location") {
		if (navigator.geolocation) { //this is an HTML5 API and lets you know if the browser has the capability to access the geolocation
			navigator.geolocation.getCurrentPosition(loadForecast,loadDefaultCityForecast); 
			// if succesful the getCurrentPosition method returns an object, where the first 2 key values are coords.latitude and coords.longitude, and then that 
			//object will be the parameter of loadBasic, so it will work
		} else {
			loadDefaultCityForecast(); // if your browser doesn't have the capabilities yóu'll see Denver weather
		}
	} else{
		loadForecast(cities[city.toLowerCase()]); // will run the loadBasic function and will update all weather basic info for that city
	}
}

function loadDefaultCityForecast() {
	loadCityForecast("Denver");
}

/*** Execution of script! ***/	
// $(document).ready(function() {
	
	$.ajaxPrefilter(function(options,originalOptions,jqXHR ) {
		options.async = true;
	});

	if (page == "indexPage") {
		loadCityBasic("Current Location"); //this is just a starting point for when the page loads, cause once I click another city in the panel that info will change, see below
		
		$("a.city").bind("click",function(){
			loadCityBasic($(this).html()); //If I click a city in the panel it will update all weather info for that city
		})
	}
	else if (page == "detailedPage") {
		loadCityDetailed("Current Location");

		$("a.city").bind("click",function(){
			loadCityDetailed($(this).html()); 
		})
	}
	else if (page == "forecastPage") {
		loadCityForecast("Current Location"); 
		
		$("a.city").bind("click",function(){
			loadCityForecast($(this).html()); 
		})	
			
	} // end of forecast page script
// }); // end of script
