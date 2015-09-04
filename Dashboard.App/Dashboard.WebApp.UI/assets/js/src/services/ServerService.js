angular.module('dashboardApp').factory('ServerService', function ($http, ConfigService) {
    var serverService = {};

    serverService.getStats = function (ip) {
        if (navigator.onLine) {
            return $http.get(ConfigService.getDashboardServiceBaseUrl() + 'SystemMonitor/' + ip, { cache: false, timeout: 5000 })
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log('Error getting server status.');
                    return -1;
                });
        }

        return null;
    };

    return serverService;
});