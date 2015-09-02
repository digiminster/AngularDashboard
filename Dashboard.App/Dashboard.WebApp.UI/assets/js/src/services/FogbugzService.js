angular.module('dashboardApp').factory('FogbugzService', function ($http, ConfigService) {
    var fogbugzService = {};

    fogbugzService.getBugCount = function () {

        if (navigator.onLine) {
            return $http.get(ConfigService.getDashboardServiceBaseUrl() + ConfigService.getBugsUrl(), { cache: false, timeout: 5000 })
                .then(function(response) {
                    return response.data;
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