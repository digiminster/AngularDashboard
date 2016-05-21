require('../services/ConfigService.js');
require('../services/FogBugzService.js');

angular.module('dashboardApp').controller('FogbugzCtrl', function ($scope, FogbugzService, ConfigService, $interval) {

    var getBugCount = function() {
        var bugCount = FogbugzService.getBugCount();
        bugCount.then(function (result) {
            $scope.bugCount = result.TotalBugs;
            $scope.verifyCount = result.TotalVerify;
            $scope.lastUpdated = new Date();
        });
    }

    getBugCount();
    $interval(getBugCount, ConfigService.getBugRefreshInterval(), 0, true);
});