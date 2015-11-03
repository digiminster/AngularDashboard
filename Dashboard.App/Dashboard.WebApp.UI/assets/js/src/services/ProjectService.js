angular.module('dashboardApp').factory('ProjectService', function ($http, ConfigService) {
    var projectsService = {};

    function projectData(id) {
        this.id = id;
        this.name = "";
        this.builds = [];
    };

    projectsService.createProjectArray = function(projects, projectsPerSlide) {
        var projectStatuses = [];

        for (var i = 0; i < projects.length; i += projectsPerSlide) {
            var innerArray = [];

            for (var j = 0; j < projectsPerSlide; j++) {
                if (i + j < projects.length) {
                    var projectObj = new projectData(projects[i + j].name);
                    innerArray.push(projectObj);
                }
            }

            projectStatuses.push(innerArray);
        }

        return projectStatuses;
    }

    projectsService.getProject = function (id) {
        if (navigator.onLine) {
            return $http.get(ConfigService.getDashboardServiceBaseUrl() + ConfigService.getProjectsUrl() + '/' + id, { cache: false, timeout: 5000 })
                .then(function (response) {
                    return response.data;
                }).catch(function (error) {
                    console.log("Error getting builds: " + error);
                    return -1;
                });
        }
        return null;
    }

    return projectsService;
});