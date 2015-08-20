angular.module('dashboardApp').factory('TrainService', function($http, ConfigService) {
    var trainService = {};

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