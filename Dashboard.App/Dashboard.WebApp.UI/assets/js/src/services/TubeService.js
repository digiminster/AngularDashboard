angular.module('dashboardApp').factory('TubeService', function ($http, ConfigService) {
    var tubeService = {};

    tubeService.getLineStatus = function(lineName) {
        if (navigator.onLine) {
            return $http.get(ConfigService.getDashboardServiceBaseUrl() + 'tubeline/' + lineName, { cache: false, timeout: 5000 })
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log('Error getting Tube status. ');
                    return -1;
                });
        }

        return null;
    };

    return tubeService;
});