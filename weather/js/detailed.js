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
			$("#precipitation").html("Precipitation: " + precipitationLevel(json.currently.precipIntensity) + (json.currently.precipIntensity)*1000 + " milli in/h"); //changes the precipitation description
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
