angular.module('dashboardApp').controller('FogbugzCtrl', function ($scope, FogbugzService, $interval) {

    var getBugCount = function(delay) {
        $interval(function () {
            var bugCount = FogbugzService.getBugCount();
            bugCount.then(function(result) {
                $scope.bugCount = result;
                $scope.lastUpdated = new Date();
                getBugCount(10000);
            });
        }, delay, 0, true);
    };

    getBugCount(10000);
});