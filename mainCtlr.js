var app = angular.module('geoLocation');

app.controller('mainCtlr', function($scope, parseService){

	$scope.addWeath = function(){
		parseService.getInfo().then(function(weather){
			$scope.weather = weather
			console.log(weather)
		})
	}


});