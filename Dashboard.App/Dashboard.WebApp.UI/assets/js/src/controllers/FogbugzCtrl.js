angular.module('dashboardApp').controller('FogbugzCtrl', function ($scope, FogbugzService, $timeout) {

    var getBugCount = function(delay) {
        $timeout(function() {
            var bugCount = FogbugzService.getBugCount();
            bugCount.then(function(result) {
                $scope.bugCount = result;
                $scope.lastUpdated = new Date();
                getBugCount(10000);
            });
        }, delay, true);
    };

    getBugCount(0);
});