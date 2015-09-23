angular.module('dashboardApp').factory('ConfigService', function ($http) {
    var configService = {};
    var configSettings = {
        dashboardServiceBaseUrl: '',
        tubeLines: '',
        trainRoutes: '',
        serverIps: '',
        bugRefreshInterval: 0,
        tubeRefreshInterval: 0,
        tubeScrollInterval: 0,
        trainRefreshInterval: 0,
        trainScrollInterval: 0,
        serverScrollInterval: 0,
        serverRefreshInterval: 0,
        projectsRefreshInterval: 0,
        bugsUrl: '',
        projectsUrl: '',
        projects: '',
        projectScrollInterval: 0
    };

    configService.loadFile = function () {
        return $http.get('assets/config.json', { cache: false, timeout: 5000 })
                .then(function (response) {
                    configSettings.dashboardServiceBaseUrl = response.data.serviceBaseUrl;
                    configSettings.tubeLines = response.data.tubeLines;
                    configSettings.trainRoutes = response.data.trainRoutes;
                    configSettings.serverIps = response.data.serverIps;
                    configSettings.bugRefreshInterval = response.data.bugRefreshInterval;
                    configSettings.tubeRefreshInterval = response.data.tubeRefreshInterval;
                    configSettings.tubeScrollInterval = response.data.tubeScrollInterval;
                    configSettings.trainRefreshInterval = response.data.trainRefreshInterval;
                    configSettings.trainScrollInterval = response.data.trainScrollInterval;
                    configSettings.serverScrollInterval = response.data.serverScrollInterval;
                    configSettings.serverRefreshInterval = response.data.serverRefreshInterval;
                    configSettings.projectsRefreshInterval = response.data.projectsRefreshInterval;
                    configSettings.bugsUrl = response.data.bugsUrl;
                    configSettings.projectsUrl = response.data.projectsUrl;
                    configSettings.projectScrollInterval = response.data.projectScrollInterval;
                    configSettings.projects = response.data.projects;

                })
                .catch(function (error) {
                    console.log("Could not load config file.");
                });
    }

    configService.getDashboardServiceBaseUrl = function () {
        return configSettings.dashboardServiceBaseUrl;
    }

    configService.getTubeLines = function () {
        return configSettings.tubeLines;
    }

    configService.getTrainRoutes = function () {
        return configSettings.trainRoutes;
    }

    configService.getServerIps = function () {
        return configSettings.serverIps;
    }

    configService.getBugRefreshInterval = function () {
        return configSettings.bugRefreshInterval;
    }

    configService.getTubeRefreshInterval = function () {
        return configSettings.tubeRefreshInterval;
    }

    configService.getTubeScrollInterval = function () {
        return configSettings.tubeScrollInterval;
    }

    configService.getTrainRefreshInterval = function () {
        return configSettings.trainRefreshInterval;
    }

    configService.getTrainScrollInterval = function () {
        return configSettings.trainScrollInterval;
    }

    configService.getServerScrollInterval = function () {
        return configSettings.serverScrollInterval;
    }

    configService.getServerRefreshInterval = function () {
        return configSettings.serverRefreshInterval;
    }

    configService.getProjectsRefreshInterval = function () {
        return configSettings.projectsRefreshInterval;
    }

    configService.getBugsUrl = function () {
        return configSettings.bugsUrl;
    }

    configService.getProjectsUrl = function () {
        return configSettings.projectsUrl;
    }

    configService.getProjects = function () {
        return configSettings.projects;
    }

    configService.getProjectScrollInterval = function () {
        return configSettings.projectScrollInterval;
    }
    return configService;
});