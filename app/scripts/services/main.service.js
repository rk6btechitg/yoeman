angular.module('project1App')
    .factory('forecast', ['$http', function($http) {
        var factory = {};
        factory.currentData = function() {
        	if(1===1) {
        		console.log('tes');
        	}
            return $http({
                method: 'GET',
                url: 'https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json'
            });
        };
        return factory;
    }]);