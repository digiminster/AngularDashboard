angular.module('dashboardApp').factory('ConfigService', function ($http) {
    "use strict";
    
    var configService = {};
    var configSettings = {};

    configService.loadFile = function () {
        return $http.get('assets/config.json', { cache: false, timeout: 5000 })
            .then(function(response) {
                configSettings = response;
                console.log(configSettings);
            })
            .catch(function (error) {
                console.log("Could not load config file.");
            });
    }

    function getModuleSettings(moduleName) {
        return configSettings.data.modules[moduleName];
    }
    configService.getModuleSettings = getModuleSettings;
    
    function getGlobalSetting(settingName) {
        return configSettings.data[settingName];
    }
    configService.getGlobalSetting = getGlobalSetting;
    
    configService.getServersPerSlide = function () {
        return getModuleSettings('Server').serversPerSlide;
    }

    configService.getDashboardServiceBaseUrl = function () {
         return getGlobalSetting('serviceBaseUrl');
    }

    configService.getTubeLines = function() {
        return getModuleSettings('Tube').tubeLines;
    }

    configService.getTrainRoutes = function () {
        return getModuleSettings('Train').trainRoutes;
    }

    configService.getServerIps = function () {
        return getModuleSettings('Server').serverIps;
    }

    configService.getBugRefreshInterval = function () {
        return getModuleSettings('Fogbugz').bugRefreshInterval;
    }

    configService.getTubeRefreshInterval = function () {
        return getModuleSettings('Tube').tubeRefreshInterval;
    }

    configService.getTubeScrollInterval = function () {
        return getModuleSettings('Tube').tubeScrollInterval;
    }

    configService.getTrainRefreshInterval = function () {
        return getModuleSettings('Train').trainRefreshInterval;
    }

    configService.getTrainScrollInterval = function () {
        return getModuleSettings('Train').trainScrollInterval;
    }

    configService.getTrainsPerSlide = function () {
        return getModuleSettings('Train').trainsPerSlide;
    }

    configService.getServerScrollInterval = function () {
        return getModuleSettings('Server').serverScrollInterval;
    }

    configService.getServerRefreshInterval = function () {
        return getModuleSettings('Server').serverRefreshInterval;
    }

    configService.getProjectsRefreshInterval = function () {
        return getModuleSettings('Project').projectsRefreshInterval;
    }

    configService.getBugsUrl = function () {
        return getModuleSettings('Fogbugz').bugsUrl;
    }

    configService.getProjectsUrl = function () {
        return getModuleSettings('Project').projectsUrl;
    }

    configService.getProjects = function () {
        return getModuleSettings('Project').projects;
    }

    configService.getProjectsPerSlide = function () {
        return getModuleSettings('Project').projectsPerSlide;
    }

    configService.getProjectScrollInterval = function () {
        return getModuleSettings('Project').projectScrollInterval;
    }

    return configService;
});