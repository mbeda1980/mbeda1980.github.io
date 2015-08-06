/***  Definition of functions for Forecast page ***/
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
			$("#precToday").html("Average Prec.: " + precipitationLevel(json.daily.data[0].precipIntensity) + ((json.daily.data[0].precipIntensity)*1000).toFixed(1) + " milli in/h");				
			var MaxPrecipDate = new Date((json.daily.data[0].precipIntensityMaxTime)*1000);
			if (json.daily.data[0].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrecToday").html("Max Prec.: " + precipitationLevel(json.daily.data[0].precipIntensityMax) + ((json.daily.data[0].precipIntensityMax)*1000).toFixed(1) + " milli in/h" + textTime);
			var sunriseDate = new Date((json.daily.data[0].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[0].sunsetTime)*1000);
			$("#sunToday").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate1 = new Date((json.daily.data[1].time)*1000);			
			$("#one a").html(weekDays[forecastDate1.getDay()] + " " + forecastDate1.getDate());
			$("#summ1").html(json.daily.data[1].summary); 
			$("#temp1").html("Min - Max Temperature: " + Math.round(json.daily.data[1].temperatureMin) + " - " + Math.round(json.daily.data[1].temperatureMax) + "&#176;F"); 
			$("#rain1").html("Chance of Rain: " + (json.daily.data[1].precipProbability)*100 + "%"); 
			$("#prec1").html("Average Prec.: " + precipitationLevel(json.daily.data[1].precipIntensity) + ((json.daily.data[1].precipIntensity)*1000).toFixed(1) + " milli in/h");				
			var MaxPrecipDate = new Date((json.daily.data[1].precipIntensityMaxTime)*1000);
			if (json.daily.data[1].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec1").html("Max Prec.: " + precipitationLevel(json.daily.data[1].precipIntensityMax) + ((json.daily.data[1].precipIntensityMax)*1000).toFixed(1) + " milli in/h" + textTime);
			var sunriseDate = new Date((json.daily.data[1].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[1].sunsetTime)*1000);
			$("#sun1").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate2 = new Date((json.daily.data[2].time)*1000);
			$("#two a").html(weekDays[forecastDate2.getDay()] + " " + forecastDate2.getDate());
			$("#summ2").html(json.daily.data[2].summary); 
			$("#temp2").html("Min - Max Temperature: " + Math.round(json.daily.data[2].temperatureMin) + " - " + Math.round(json.daily.data[2].temperatureMax) + "&#176;F"); 
			$("#rain2").html("Chance of Rain: " + (json.daily.data[2].precipProbability)*100 + "%"); 
			$("#prec2").html("Average Prec.: " + precipitationLevel(json.daily.data[2].precipIntensity) + ((json.daily.data[2].precipIntensity)*1000).toFixed(1) + " milli in/h");				
			var MaxPrecipDate = new Date((json.daily.data[2].precipIntensityMaxTime)*1000);
			if (json.daily.data[2].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec2").html("Max Prec.: " + precipitationLevel(json.daily.data[2].precipIntensityMax) + ((json.daily.data[2].precipIntensityMax)*1000).toFixed(1) + " milli in/h" + textTime);
			var sunriseDate = new Date((json.daily.data[2].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[2].sunsetTime)*1000);
			$("#sun2").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate3 = new Date((json.daily.data[3].time)*1000);
			$("#three a").html(weekDays[forecastDate3.getDay()] + " " + forecastDate3.getDate());
			$("#summ3").html(json.daily.data[3].summary); 
			$("#temp3").html("Min - Max Temperature: " + Math.round(json.daily.data[3].temperatureMin) + " - " + Math.round(json.daily.data[3].temperatureMax) + "&#176;F"); 
			$("#rain3").html("Chance of Rain: " + (json.daily.data[3].precipProbability)*100 + "%"); 
			$("#prec3").html("Average Prec.: " + precipitationLevel(json.daily.data[3].precipIntensity) + ((json.daily.data[3].precipIntensity)*1000).toFixed(1) + " milli in/h");				
			var MaxPrecipDate = new Date((json.daily.data[3].precipIntensityMaxTime)*1000);
			if (json.daily.data[3].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec3").html("Max Prec.: " + precipitationLevel(json.daily.data[3].precipIntensityMax) + ((json.daily.data[3].precipIntensityMax)*1000).toFixed(1) + " milli in/h" + textTime);
			var sunriseDate = new Date((json.daily.data[3].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[3].sunsetTime)*1000);
			$("#sun3").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate4 = new Date((json.daily.data[4].time)*1000);
			$("#four a").html(weekDays[forecastDate4.getDay()] + " " + forecastDate4.getDate());
			$("#summ4").html(json.daily.data[4].summary); 
			$("#temp4").html("Min - Max Temperature: " + Math.round(json.daily.data[4].temperatureMin) + " - " + Math.round(json.daily.data[4].temperatureMax) + "&#176;F"); 
			$("#rain4").html("Chance of Rain: " + (json.daily.data[4].precipProbability)*100 + "%"); 
			$("#prec4").html("Average Prec.: " + precipitationLevel(json.daily.data[4].precipIntensity) + ((json.daily.data[4].precipIntensity)*1000).toFixed(1) + " milli in/h");				
			var MaxPrecipDate = new Date((json.daily.data[4].precipIntensityMaxTime)*1000);
			if (json.daily.data[4].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec4").html("Max Prec.: " + precipitationLevel(json.daily.data[4].precipIntensityMax) + ((json.daily.data[4].precipIntensityMax)*1000).toFixed(1) + " milli in/h" + textTime);
			var sunriseDate = new Date((json.daily.data[4].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[4].sunsetTime)*1000);
			$("#sun4").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate5 = new Date((json.daily.data[5].time)*1000);
			$("#five a").html(weekDays[forecastDate5.getDay()] + " " + forecastDate5.getDate());
			$("#summ5").html(json.daily.data[5].summary); 
			$("#temp5").html("Min - Max Temperature: " + Math.round(json.daily.data[5].temperatureMin) + " - " + Math.round(json.daily.data[5].temperatureMax) + "&#176;F"); 
			$("#rain5").html("Chance of Rain: " + (json.daily.data[5].precipProbability)*100 + "%"); 
			$("#prec5").html("Average Prec.: " + precipitationLevel(json.daily.data[5].precipIntensity) + ((json.daily.data[5].precipIntensity)*1000).toFixed(1) + " milli in/h");				
			var MaxPrecipDate = new Date((json.daily.data[5].precipIntensityMaxTime)*1000);
			if (json.daily.data[5].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec5").html("Max Prec.: " + precipitationLevel(json.daily.data[5].precipIntensityMax) + ((json.daily.data[5].precipIntensityMax)*1000).toFixed(1) + " milli in/h" + textTime);			
			var sunriseDate = new Date((json.daily.data[5].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[5].sunsetTime)*1000);
			$("#sun5").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate6 = new Date((json.daily.data[6].time)*1000);
			$("#six a").html(weekDays[forecastDate6.getDay()] + " " + forecastDate6.getDate());
			$("#summ6").html(json.daily.data[6].summary); 
			$("#temp6").html("Min - Max Temperature: " + Math.round(json.daily.data[6].temperatureMin) + " - " + Math.round(json.daily.data[6].temperatureMax) + "&#176;F"); 
			$("#rain6").html("Chance of Rain: " + (json.daily.data[6].precipProbability)*100 + "%"); 
			$("#prec6").html("Average Prec.: " + precipitationLevel(json.daily.data[6].precipIntensity) + ((json.daily.data[6].precipIntensity)*1000).toFixed(1) + " milli in/h");				
			var MaxPrecipDate = new Date((json.daily.data[6].precipIntensityMaxTime)*1000);
			if (json.daily.data[6].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec6").html("Max Prec.: " + precipitationLevel(json.daily.data[6].precipIntensityMax) + ((json.daily.data[6].precipIntensityMax)*1000).toFixed(1) + " milli in/h" + textTime);
			var sunriseDate = new Date((json.daily.data[6].sunriseTime)*1000);
			var sunsetDate = new Date((json.daily.data[6].sunsetTime)*1000);
			$("#sun6").html("Sunrise - Sunset: " + hoursAndMinutes(sunriseDate) + " - " + hoursAndMinutes(sunsetDate));

			var forecastDate7 = new Date((json.daily.data[7].time)*1000);
			$("#seven a").html(weekDays[forecastDate7.getDay()] + " " + forecastDate7.getDate());
			$("#summ7").html(json.daily.data[7].summary); 
			$("#temp7").html("Min - Max Temperature: " + Math.round(json.daily.data[7].temperatureMin) + " - " + Math.round(json.daily.data[7].temperatureMax) + "&#176;F"); 
			$("#rain7").html("Chance of Rain: " + (json.daily.data[7].precipProbability)*100 + "%"); 
			$("#prec7").html("Average Prec.: " + precipitationLevel(json.daily.data[7].precipIntensity) + ((json.daily.data[7].precipIntensity)*1000).toFixed(1) + " milli in/h");				
			var MaxPrecipDate = new Date((json.daily.data[7].precipIntensityMaxTime)*1000);
			if (json.daily.data[7].precipIntensityMax >0) {var textTime = " " + hoursAndMinutes(MaxPrecipDate);} else {var textTime = ""}
			$("#maxPrec7").html("Max Prec.: "  + precipitationLevel(json.daily.data[7].precipIntensityMax) + ((json.daily.data[7].precipIntensityMax)*1000).toFixed(1) + " milli in/h" + textTime);
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
	           ((json.daily.data[0].precipIntensity)*1000).toFixed(1),
	           ((json.daily.data[1].precipIntensity)*1000).toFixed(1),
	           ((json.daily.data[2].precipIntensity)*1000).toFixed(1),
	           ((json.daily.data[3].precipIntensity)*1000).toFixed(1),
	           ((json.daily.data[4].precipIntensity)*1000).toFixed(1),
	           ((json.daily.data[5].precipIntensity)*1000).toFixed(1),
	           ((json.daily.data[6].precipIntensity)*1000).toFixed(1),
	           ((json.daily.data[7].precipIntensity)*1000).toFixed(1),
		    ];

		    var dataPrecMax = [
				((json.daily.data[0].precipIntensityMax)*1000).toFixed(1),    	
		    	((json.daily.data[1].precipIntensityMax)*1000).toFixed(1),
		    	((json.daily.data[2].precipIntensityMax)*1000).toFixed(1),
		    	((json.daily.data[3].precipIntensityMax)*1000).toFixed(1),	
		    	((json.daily.data[4].precipIntensityMax)*1000).toFixed(1),	
		    	((json.daily.data[5].precipIntensityMax)*1000).toFixed(1),
		    	((json.daily.data[6].precipIntensityMax)*1000).toFixed(1),	
		    	((json.daily.data[7].precipIntensityMax)*1000).toFixed(1),		
		    ]

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

			var ctxTemp = document.getElementById("canvasTemp").getContext("2d");
			var tempChart = new Chart(ctxTemp).Line(tempDataChart, {
				responsive : true,
			});

			/* Precipitation Chart */
			var precDataChart = {
			    labels: chartDates,
			    datasets: [
			        {
			            label: "Max Precipitation",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(220,220,220,1)",
			            pointColor: "rgba(220,220,220,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(220,220,220,1)",
			            data: dataPrecMax
			        },
			        {
			            label: "Average Precipitation",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(151,187,205,1)",
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: dataPrec
			        }
			    ]
			};

			var ctxPrec = document.getElementById("canvasPrec").getContext("2d");
			var precChart = new Chart(ctxPrec).Line(precDataChart, {
				responsive : true,
			});
					    
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
