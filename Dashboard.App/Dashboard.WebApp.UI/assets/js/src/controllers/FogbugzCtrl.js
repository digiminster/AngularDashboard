angular.module('dashboardApp').controller('FogbugzCtrl', function ($scope, FogbugzService, ConfigService, $interval) {

    var getBugCount = function() {
        var bugCount = FogbugzService.getBugCount();
        bugCount.then(function(result) {
            $scope.bugCount = result;
            $scope.lastUpdated = new Date();
        });
    }

    var repeatBugCountCall = function(delay) {
        $interval(getBugCount, delay, 0, true);
    };

    repeatBugCountCall(ConfigService.getBugRefreshInterval());
});