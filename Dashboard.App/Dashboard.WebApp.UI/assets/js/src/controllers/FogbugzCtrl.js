angular.module('dashboardApp').controller('FogbugzCtrl', function ($scope, FogbugzService) {

    var bugCount = FogbugzService.getBugCount();
    bugCount.then(function (result) {
        $scope.bugCount = result;
    });
});