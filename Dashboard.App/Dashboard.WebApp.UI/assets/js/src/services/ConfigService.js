angular.module('dashboardApp').factory('ConfigService', function ($http) {
    var configService = {};
    var configSettings = {};

    configService.loadFile = function () {
        return $http.get('assets/config.json', { cache: false, timeout: 5000 })
                .then(function (response) {
                    configSettings = response;
            })
                .catch(function (error) {
                    console.log("Could not load config file.");
                });
    }

    configService.getDashboardServiceBaseUrl = function () {
        return configSettings.data.serviceBaseUrl;
    }

    configService.getTubeLines = function() {
        return configSettings.data.tubeLines;
    }

    configService.getTrainRoutes = function() {
        return configSettings.data.trainRoutes;
    }

    configService.getServerIps = function () {
        return configSettings.data.serverIps;
    }

    configService.getBugRefreshInterval = function() {
        return configSettings.data.bugRefreshInterval;
    }

    configService.getTubeRefreshInterval = function() {
        return configSettings.data.tubeRefreshInterval;
    }

    configService.getTubeScrollInterval = function () {
        return configSettings.data.tubeScrollInterval;
    }

    configService.getTrainRefreshInterval = function () {
        return configSettings.data.trainRefreshInterval;
    }

    configService.getTrainScrollInterval = function () {
        return configSettings.data.trainScrollInterval;
    }

    configService.getTrainsPerSlide = function () {
        return configSettings.data.trainsPerSlide;
    }

    configService.getServerScrollInterval = function() {
        return configSettings.data.serverScrollInterval;
    }

    configService.getServerRefreshInterval = function () {
        return configSettings.data.serverRefreshInterval;
    }

    configService.getServersPerSlide = function () {
        return configSettings.data.serversPerSlide;
    }

    configService.getBugsUrl = function () {
        return configSettings.data.bugsUrl;
    }

    return configService;
});