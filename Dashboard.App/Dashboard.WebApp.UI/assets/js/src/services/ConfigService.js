angular.module('dashboardApp').factory('ConfigService', function() {
    var configService = {};
    var configSettings = {
        dashboardServiceBaseUrl: 'http://local.dashboard.service/'
    };

    configService.getDashboardServiceBaseUrl = function() {
        return configSettings.dashboardServiceBaseUrl;
    }

    return configService;
});