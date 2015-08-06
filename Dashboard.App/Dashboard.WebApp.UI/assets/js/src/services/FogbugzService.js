angular.module('dashboardApp').factory('FogbugzService', function ($http, ConfigService) {
    var fogbugzService = {};

    fogbugzService.getBugCount = function () {

        if (navigator.onLine) {
            return $http.get(ConfigService.getDashboardServiceBaseUrl() + 'fogbugz/Rapid%20Apps', { cache: false, timeout: 5000 })
                .then(function(response) {
                    var bugCount = JSON.parse(response.data[0]).TotalBugs;
                    return bugCount;
                })
                .catch(function(error) {
                    console.log('Error getting bug count. ');
                    return -1;
            });
        }

        return null;
    }

    return fogbugzService;
});