angular.module('dashboardApp').controller('FogbugzCtrl', function ($scope, FogbugzService, $timeout) {

    var getBugCount = function() {
        $timeout(function() {
            var bugCount = FogbugzService.getBugCount();
            bugCount.then(function(result) {
                $scope.bugCount = result;
                $scope.lastUpdated = new Date();
                getBugCount();
            });
        }, 10000, true);
    };

    getBugCount();
});