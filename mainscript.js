/*** Definition of variables ***/
var icons = {	"clear-day" : "B", 
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
				"san jose" 		:	{coords: {latitude: 37.339390, longitude: -121.89496}},
			 };

/*** Definition of functions ***/				 
function loadWeather(cityCoords) {
	var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;

	var forecastURL ="https://api.forecast.io/forecast/2db00ee1ac3c9d37be124f62c67bb9f8/" + latlng;

	$.ajax({
		url: forecastURL,
		jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(json) {
			console.log(json);
			$("#current_temp").html(Math.round(json.currently.temperature)+"&#176;F"); //this changes the content of the current temperature
			$("#current_summary").html(json.currently.summary); //changes the summary description
			$("#current_temp").attr("data-icon",icons[json.currently.icon]); // changes the icon before the temperature
			$("#wind").html(json.currently.windSpeed + " MPH");
			$("#rain").html(json.currently.precipProbability + "%");
		},
		error: function(e) {
			console.log(e.message);
		}
	});
} // this gives the weather info of a city with its coordinates

function loadCity(city) {
	$("#location").html(city); // changes the description of location to the input city in the content area

	if (city.toLowerCase() == "current location") {
		if (navigator.geolocation) { //this is an HTML5 API and lets you know if the browser has the capability to access the geolocation
			navigator.geolocation.getCurrentPosition(loadWeather,loadDefaultCity); // if succesful the getCurrentPosition method returns an object, where the first 2 key values are coords.latitude and coords.longitude, and then that object will be the parameter of loadWeather, so it will work
		} else {
			loadDefaultCity(); // if your browser doesn't have the capabilities yóu'll see San Francisco weather
		}
	} else{
		loadWeather(cities[city.toLowerCase()]); // will run the loadweather function and will update all weather info for that city
	}
}

function loadDefaultCity() {
	loadCity("San Francisco");
}	

/*** Execution of script! ***/	
$(document).ready(function() {
	loadCity("Current Location"); //this is just a starting point for when the page loads, cause once a click another city in the panel that info will change, see below
	
	$("a.city").bind("click",function(){
		loadCity($(this).html()); //If I click a city in the panel it will update all weather info for that city
	})
});
