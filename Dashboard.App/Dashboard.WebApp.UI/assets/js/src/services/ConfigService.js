angular.module('dashboardApp').factory('ConfigService', function($http) {
    var configService = {};
    var configSettings = {
        dashboardServiceBaseUrl: ''
    };

    var loadFile = function() {
        return $http.get('assets/config.json', { cache: false, timeout: 5000 })
                .then(function (response) {
                    configSettings.dashboardServiceBaseUrl = response.data.serviceBaseUrl;
            })
                .catch(function (error) {
                    console.log("Could not load config file.");
                });
    }

    configService.getDashboardServiceBaseUrl = function() {
        return configSettings.dashboardServiceBaseUrl;
    }

    loadFile();

    return configService;
});