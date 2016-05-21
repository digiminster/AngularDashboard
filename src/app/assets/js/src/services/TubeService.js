angular.module('dashboardApp').factory('TubeService', function ($http, ConfigService) {
    var tubeService = {};

    tubeService.createLineArray = function (lineNames) {
        var lineStatuses = [];

        angular.forEach(lineNames, function (value, key) {
            var lineStatus = { lineName: value, status: "", backColour: "", foreColour: "" };
            lineStatuses.push(lineStatus);
        });

        return lineStatuses;
    }

    tubeService.getLineStatus = function(lineName) {
        if (navigator.onLine) {
            return $http.get(ConfigService.getDashboardServiceBaseUrl() + 'tubeline/' + lineName, { cache: false, timeout: 5000 })
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log('Error getting Tube status: ' + error);
                    return -1;
                });
        }

        return null;
    };

    return tubeService;
});