angular.module('dashboardApp').factory('TrainService', function($http, ConfigService) {
    var trainService = {};

    function route() {
        this.from = '';
        this.to = '';
        this.departures = '';
    };

    trainService.createTrainArray = function (routes, routesPerSlide) {
        var departureTimes = [];

        for (var i = 0; i < routes.length; i += routesPerSlide) {
            var innerArray = [];

            for (var j = 0; j < routesPerSlide; j++) {
                var routeObj = new route();

                if (i + j < routes.length) {
                    routeObj.from = routes[i + j].from;
                    routeObj.to = routes[i + j].to;
                    innerArray.push(routeObj);
                }
            }

            departureTimes.push(innerArray);
        }

        return departureTimes;
    }

    trainService.getDepartures = function(from, to) {
        if (navigator.onLine) {
            return $http.get(ConfigService.getDashboardServiceBaseUrl() + 'trains/' + from + '/' + to, { cache: false, timeout: 5000 })
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log('Error getting train status.');
                    return -1;
                });
        }

        return null;
    };

    return trainService;
});