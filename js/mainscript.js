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

function precipitationLevel (prec) {
	if (prec==0) {
		return "";
	}
	else if (prec<=0.01) {
		return "Very Light: ";
	} else if (prec<=0.039) {
		return "Light: ";
	} else if (prec<=0.157) {
		return "Moderate: ";
	} else if (prec<=0.63) {
		return "Heavy: ";
	} else if (prec<=1.969) {
		return "Very Heavy: ";
	} else if (prec>1.969) {
		return "Extreme: "
	}
}

// Redirect to another weather section as an HTTP redirect
function redirectToDetailed(){
	window.location.replace("detailed.html");
}

function redirectToIndex(){
	window.location.replace("index.html");
}

function redirectToForecast(){
	window.location.replace("forecast.html");
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
			$("#precipitation").html("Precipitation: " + precipitationLevel(json.currently.precipIntensity) + json.currently.precipIntensity + " in/hr"); //changes the precipitation description
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
			var forecastDate0 = new Date((json.daily.data[0].time)*1000);
			$("#summToday").html(json.daily.data[0].summary); 
			$("#tempToday").html("Min - Max Temperature: " + Math.round(json.daily.data[0].temperatureMin) + " - " + Math.round(json.daily.data[0].temperatureMax) + "&#176;F"); 
			$("#rainToday").html("Chance of Rain: " + (json.daily.data[0].precipProbability)*100 + "%"); 
			$("#precToday").html("Average Prec.: " + precipitationLevel(json.daily.data[0].precipIntensity) + (json.daily.data[0].precipIntensity).toFixed(3) + " in/hr");				
			var MaxPrecipDate = new Date((json.daily.data[0].precipIntensityMaxTime)*1000);
			if (json.daily.data[0].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrecToday").html("Max Prec.: " + precipitationLevel(json.daily.data[0].precipIntensityMax) + (json.daily.data[0].precipIntensityMax).toFixed(3) + " in/hr" + textTime);
			var sunriseDate = new Date((json.daily.data[0].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[0].sunsetTime)*1000);
			$("#sunToday").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate1 = new Date((json.daily.data[1].time)*1000);			
			$("#one a").html(weekDays[forecastDate1.getDay()] + " " + forecastDate1.getDate());
			$("#summ1").html(json.daily.data[1].summary); 
			$("#temp1").html("Min - Max Temperature: " + Math.round(json.daily.data[1].temperatureMin) + " - " + Math.round(json.daily.data[1].temperatureMax) + "&#176;F"); 
			$("#rain1").html("Chance of Rain: " + (json.daily.data[1].precipProbability)*100 + "%"); 
			$("#prec1").html("Average Prec.: " + precipitationLevel(json.daily.data[1].precipIntensity) + (json.daily.data[1].precipIntensity).toFixed(3) + " in/hr");				
			var MaxPrecipDate = new Date((json.daily.data[1].precipIntensityMaxTime)*1000);
			if (json.daily.data[1].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec1").html("Max Prec.: " + precipitationLevel(json.daily.data[1].precipIntensityMax) + (json.daily.data[1].precipIntensityMax).toFixed(3) + " in/hr" + textTime);
			var sunriseDate = new Date((json.daily.data[1].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[1].sunsetTime)*1000);
			$("#sun1").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate2 = new Date((json.daily.data[2].time)*1000);
			$("#two a").html(weekDays[forecastDate2.getDay()] + " " + forecastDate2.getDate());
			$("#summ2").html(json.daily.data[2].summary); 
			$("#temp2").html("Min - Max Temperature: " + Math.round(json.daily.data[2].temperatureMin) + " - " + Math.round(json.daily.data[2].temperatureMax) + "&#176;F"); 
			$("#rain2").html("Chance of Rain: " + (json.daily.data[2].precipProbability)*100 + "%"); 
			$("#prec2").html("Average Prec.: " + precipitationLevel(json.daily.data[2].precipIntensity) + (json.daily.data[2].precipIntensity).toFixed(3) + " in/hr");				
			var MaxPrecipDate = new Date((json.daily.data[2].precipIntensityMaxTime)*1000);
			if (json.daily.data[2].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec2").html("Max Prec.: " + precipitationLevel(json.daily.data[2].precipIntensityMax) + (json.daily.data[2].precipIntensityMax).toFixed(3) + " in/hr" + textTime);
			var sunriseDate = new Date((json.daily.data[2].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[2].sunsetTime)*1000);
			$("#sun2").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate3 = new Date((json.daily.data[3].time)*1000);
			$("#three a").html(weekDays[forecastDate3.getDay()] + " " + forecastDate3.getDate());
			$("#summ3").html(json.daily.data[3].summary); 
			$("#temp3").html("Min - Max Temperature: " + Math.round(json.daily.data[3].temperatureMin) + " - " + Math.round(json.daily.data[3].temperatureMax) + "&#176;F"); 
			$("#rain3").html("Chance of Rain: " + (json.daily.data[3].precipProbability)*100 + "%"); 
			$("#prec3").html("Average Prec.: " + precipitationLevel(json.daily.data[3].precipIntensity) + (json.daily.data[3].precipIntensity).toFixed(3) + " in/hr");				
			var MaxPrecipDate = new Date((json.daily.data[3].precipIntensityMaxTime)*1000);
			if (json.daily.data[3].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec3").html("Max Prec.: " + precipitationLevel(json.daily.data[3].precipIntensityMax) + (json.daily.data[3].precipIntensityMax).toFixed(3) + " in/hr" + textTime);
			var sunriseDate = new Date((json.daily.data[3].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[3].sunsetTime)*1000);
			$("#sun3").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate4 = new Date((json.daily.data[4].time)*1000);
			$("#four a").html(weekDays[forecastDate4.getDay()] + " " + forecastDate4.getDate());
			$("#summ4").html(json.daily.data[4].summary); 
			$("#temp4").html("Min - Max Temperature: " + Math.round(json.daily.data[4].temperatureMin) + " - " + Math.round(json.daily.data[4].temperatureMax) + "&#176;F"); 
			$("#rain4").html("Chance of Rain: " + (json.daily.data[4].precipProbability)*100 + "%"); 
			$("#prec4").html("Average Prec.: " + precipitationLevel(json.daily.data[4].precipIntensity) + (json.daily.data[4].precipIntensity).toFixed(3) + " in/hr");				
			var MaxPrecipDate = new Date((json.daily.data[4].precipIntensityMaxTime)*1000);
			if (json.daily.data[4].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec4").html("Max Prec.: " + precipitationLevel(json.daily.data[4].precipIntensityMax) + (json.daily.data[4].precipIntensityMax).toFixed(3) + " in/hr" + textTime);
			var sunriseDate = new Date((json.daily.data[4].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[4].sunsetTime)*1000);
			$("#sun4").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate5 = new Date((json.daily.data[5].time)*1000);
			$("#five a").html(weekDays[forecastDate5.getDay()] + " " + forecastDate5.getDate());
			$("#summ5").html(json.daily.data[5].summary); 
			$("#temp5").html("Min - Max Temperature: " + Math.round(json.daily.data[5].temperatureMin) + " - " + Math.round(json.daily.data[5].temperatureMax) + "&#176;F"); 
			$("#rain5").html("Chance of Rain: " + (json.daily.data[5].precipProbability)*100 + "%"); 
			$("#prec5").html("Average Prec.: " + precipitationLevel(json.daily.data[5].precipIntensity) + (json.daily.data[5].precipIntensity).toFixed(3) + " in/hr");				
			var MaxPrecipDate = new Date((json.daily.data[5].precipIntensityMaxTime)*1000);
			if (json.daily.data[5].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec5").html("Max Prec.: " + precipitationLevel(json.daily.data[5].precipIntensityMax) + (json.daily.data[5].precipIntensityMax).toFixed(3) + " in/hr" + textTime);			
			var sunriseDate = new Date((json.daily.data[5].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[5].sunsetTime)*1000);
			$("#sun5").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate6 = new Date((json.daily.data[6].time)*1000);
			$("#six a").html(weekDays[forecastDate6.getDay()] + " " + forecastDate6.getDate());
			$("#summ6").html(json.daily.data[6].summary); 
			$("#temp6").html("Min - Max Temperature: " + Math.round(json.daily.data[6].temperatureMin) + " - " + Math.round(json.daily.data[6].temperatureMax) + "&#176;F"); 
			$("#rain6").html("Chance of Rain: " + (json.daily.data[6].precipProbability)*100 + "%"); 
			$("#prec6").html("Average Prec.: " + precipitationLevel(json.daily.data[6].precipIntensity) + (json.daily.data[6].precipIntensity).toFixed(3) + " in/hr");				
			var MaxPrecipDate = new Date((json.daily.data[6].precipIntensityMaxTime)*1000);
			if (json.daily.data[6].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec6").html("Max Prec.: " + precipitationLevel(json.daily.data[6].precipIntensityMax) + (json.daily.data[6].precipIntensityMax).toFixed(3) + " in/hr" + textTime);
			var sunriseDate = new Date((json.daily.data[6].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[6].sunsetTime)*1000);
			$("#sun6").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate7 = new Date((json.daily.data[7].time)*1000);
			$("#seven a").html(weekDays[forecastDate7.getDay()] + " " + forecastDate7.getDate());
			$("#summ7").html(json.daily.data[7].summary); 
			$("#temp7").html("Min - Max Temperature: " + Math.round(json.daily.data[7].temperatureMin) + " - " + Math.round(json.daily.data[7].temperatureMax) + "&#176;F"); 
			$("#rain7").html("Chance of Rain: " + (json.daily.data[7].precipProbability)*100 + "%"); 
			$("#prec7").html("Average Prec.: " + precipitationLevel(json.daily.data[7].precipIntensity) + (json.daily.data[7].precipIntensity).toFixed(3) + " in/hr");				
			var MaxPrecipDate = new Date((json.daily.data[7].precipIntensityMaxTime)*1000);
			if (json.daily.data[7].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec7").html("Max Prec.: "  + precipitationLevel(json.daily.data[7].precipIntensityMax) + (json.daily.data[7].precipIntensityMax).toFixed(3) + " in/hr" + textTime);
			var sunriseDate = new Date((json.daily.data[7].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[7].sunsetTime)*1000);
			$("#sun7").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			/* Chart js*/
			var chartDates = [
		    	"Today",
		    	(forecastDate1.getMonth() + 1) + "/" + forecastDate1.getDate(),
	    	 	(forecastDate2.getMonth() + 1) + "/" + forecastDate2.getDate(),
	    	 	(forecastDate3.getMonth() + 1) + "/" + forecastDate3.getDate(),
	    	 	(forecastDate4.getMonth() + 1) + "/" + forecastDate4.getDate(),
	    	 	(forecastDate5.getMonth() + 1) + "/" + forecastDate5.getDate(),
	    	 	(forecastDate6.getMonth() + 1) + "/" + forecastDate6.getDate(),
	    	 	(forecastDate7.getMonth() + 1) + "/" + forecastDate7.getDate(),
		    ]

			var dataTempMin = [
		            Math.round(json.daily.data[0].temperatureMin),
		            Math.round(json.daily.data[1].temperatureMin),
		            Math.round(json.daily.data[2].temperatureMin),
		            Math.round(json.daily.data[3].temperatureMin),
		            Math.round(json.daily.data[4].temperatureMin),
		            Math.round(json.daily.data[5].temperatureMin),
		            Math.round(json.daily.data[6].temperatureMin),
		            Math.round(json.daily.data[7].temperatureMin)
		    ];

		    var dataTempMax = [
		            Math.round(json.daily.data[0].temperatureMax),
		            Math.round(json.daily.data[1].temperatureMax),
		            Math.round(json.daily.data[2].temperatureMax),
		            Math.round(json.daily.data[3].temperatureMax),
		            Math.round(json.daily.data[4].temperatureMax),
		            Math.round(json.daily.data[5].temperatureMax),
		            Math.round(json.daily.data[6].temperatureMax),
		            Math.round(json.daily.data[7].temperatureMax)
		    ];

		    var dataPrec = [
		            Math.round(json.daily.data[0].precipIntensity),
		            Math.round(json.daily.data[1].precipIntensity),
		            Math.round(json.daily.data[2].precipIntensity),
		            Math.round(json.daily.data[3].precipIntensity),
		            Math.round(json.daily.data[4].precipIntensity),
		            Math.round(json.daily.data[5].precipIntensity),
		            Math.round(json.daily.data[6].precipIntensity),
		            Math.round(json.daily.data[7].precipIntensity)
		    ];

		    var dataHumid = [
		            Math.round((json.daily.data[0].humidity)*100),
		            Math.round((json.daily.data[1].humidity)*100),
		            Math.round((json.daily.data[2].humidity)*100),
		            Math.round((json.daily.data[3].humidity)*100),
		            Math.round((json.daily.data[4].humidity)*100),
		            Math.round((json.daily.data[5].humidity)*100),
		            Math.round((json.daily.data[6].humidity)*100),
		            Math.round((json.daily.data[7].humidity)*100)
		    ];

		    var dataVisib = [
		            Math.round(json.daily.data[0].visibility),
		            Math.round(json.daily.data[1].visibility),
		            Math.round(json.daily.data[2].visibility),
		            Math.round(json.daily.data[3].visibility),
		            Math.round(json.daily.data[4].visibility),
		            Math.round(json.daily.data[5].visibility),
		            Math.round(json.daily.data[6].visibility),
		            Math.round(json.daily.data[7].visibility)
		    ];

			var dataPressure = [
		            Math.round(json.daily.data[0].pressure),
		            Math.round(json.daily.data[1].pressure),
		            Math.round(json.daily.data[2].pressure),
		            Math.round(json.daily.data[3].pressure),
		            Math.round(json.daily.data[4].pressure),
		            Math.round(json.daily.data[5].pressure),
		            Math.round(json.daily.data[6].pressure),
		            Math.round(json.daily.data[7].pressure)
		    ];

		    //define rest of variables (5 more)		    

			/* Temperature Chart */
			var tempDataChart = {
			    labels: chartDates,
			    datasets: [
			        {
			            label: "Max Temperature",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(220,220,220,1)",
			            pointColor: "rgba(220,220,220,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: dataTempMax
			        },
			        {
			            label: "Min Temperature",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: dataTempMin
			        }
			    ]
			};

			// var ctxTemp = document.getElementById("canvasTemp").getContext("2d");
			// var tempChart = new Chart(ctxTemp).Line(tempDataChart, {
			// 	responsive : true,
			// });

			/* Precipitation Chart */
			var precDataChart = {
			labels: chartDates,
			datasets: [{
				        label: "Average Precipitation",
				        fillColor: "rgba(151,187,205,0.5)",
				        strokeColor: "rgba(151,187,205,0.8)",
				        highlightFill: "rgba(151,187,205,0.75)",
				        highlightStroke: "rgba(151,187,205,1)",
				        data: dataPrec
			    	}] 
			};

			var ctxPrec = document.getElementById("canvasTemp").getContext("2d");
			var precChart = new Chart(ctxPrec).Bar(precDataChart, {
				responsive : true,
				scaleShowVerticalLines: false
			});

			/* Humidity Chart */
			/* Visibility Chart */
			/* Pressure Chart */
			/* Rain Chance Chart */
			/* Dew Point Chart */
			/* Wind Speed Chart */
			/* Cloud Cover Chart */
			/* Moon Phase Chart */

		}, //end of ajax success

		error: function(e) {
			console.log(e.message);
		} //end of ajax error

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
$(document).ready(function() {
	
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
		
		$("#tempButton").trigger("click");
	} // end of forecast page script
});

