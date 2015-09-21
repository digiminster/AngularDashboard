angular.module('dashboardApp').factory('ProjectService', function ($http, ConfigService) {
    var projectsService = {};

    projectsService.getProject = function (projectName) {
        if (navigator.onLine) {
            return $http.get(ConfigService.getDashboardServiceBaseUrl() + ConfigService.getProjectsUrl() + '/' + projectName, { cache: false, timeout: 5000 })
                .then(function (response) {
                    return response.data;
                }).catch(function (error) {
                    console.log("Error getting broken builds.");
                    return -1;
                });
        }
        return null;
    }
    return projectsService;
});