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
	else if (prec<=0.010) {
		return "Very light: ";
	} else if (prec<=0.039) {
		return "Light: ";
	} else if (prec<=0.157) {
		return "Moderate: ";
	} else if (prec<=0.630) {
		return "Heavy: ";
	} else if (prec<=1.969) {
		return "Very heavy: ";
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
	window.location.replace("forecastTemp.html");
}






			


		


