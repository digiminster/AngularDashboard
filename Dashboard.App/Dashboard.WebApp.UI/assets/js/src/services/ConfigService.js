angular.module('dashboardApp').factory('ConfigService', function ($http) {
    var configService = {};
    var configSettings = {
        dashboardServiceBaseUrl: '',
        tubeLines: '',
        trainRoutes: '',
        bugRefreshInterval: 0,
        tubeRefreshInterval: 0,
        trainRefreshInterval: 0
    };

    configService.loadFile = function () {
        return $http.get('assets/config.json', { cache: false, timeout: 5000 })
                .then(function (response) {
                    configSettings.dashboardServiceBaseUrl = response.data.serviceBaseUrl;
                    configSettings.tubeLines = response.data.tubeLines;
                    configSettings.trainRoutes = response.data.trainRoutes;
                    configSettings.bugRefreshInterval = response.data.bugRefreshInterval;
                    configSettings.tubeRefreshInterval = response.data.tubeRefreshInterval;
                    configSettings.trainRefreshInterval = response.data.trainRefreshInterval;
            })
                .catch(function (error) {
                    console.log("Could not load config file.");
                });
    }

    configService.getDashboardServiceBaseUrl = function () {
        return configSettings.dashboardServiceBaseUrl;
    }

    configService.getTubeLines = function() {
        return configSettings.tubeLines;
    }

    configService.getTrainRoutes = function() {
        return configSettings.trainRoutes;
    }

    configService.getBugRefreshInterval = function() {
        return configSettings.bugRefreshInterval;
    }

    configService.getTubeRefreshInterval = function() {
        return configSettings.tubeRefreshInterval;
    }

    configService.getTrainRefreshInterval = function () {
        return configSettings.trainRefreshInterval;
    }

    return configService;
});