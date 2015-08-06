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