var app = angular.module('geoLocation');

app.service('parseService', function($http, $q){


	this.getInfo = function(){
		var dfd = $q.defer();
		var totalInformation = {};
		navigator.geolocation.getCurrentPosition(function(position) {
			var coords = {
				lat: position.coords.latitude,
				long: position.coords.longitude
			}
	  		getAddress(coords)
	  		.then(function(results){
	  			totalInformation.address = results.data.address;
	  			return getWeather(coords)
	  		})
	  		.then(function(results){
  				totalInformation.weather = results.data;
  				dfd.resolve(totalInformation);
  			})
		});
		return dfd.promise;
	}


	var getAddress = function(coords){
		return $http({
			method: 'GET',
			url: 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + coords.lat + '&lon=' + coords.long + '&zoom=18&addressdetails=1'
		})
	}

	var getWeather = function(coords){
		return $http({
			method: 'GET',
			url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.lat + '&lon=' + coords.long + '&units=imperial'
		})
	}

})