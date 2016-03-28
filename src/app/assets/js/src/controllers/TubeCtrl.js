require('../services/TubeService.js');
require('../services/ConfigService.js');

angular.module('dashboardApp').controller('TubeCtrl', function ($scope, TubeService, $interval, ConfigService) {
    var lines = ConfigService.getTubeLines();
    $scope.lineStatuses = TubeService.createLineArray(lines);
    $scope.tubeScrollInterval = ConfigService.getTubeScrollInterval();
    var tubeRefreshInterval = ConfigService.getTubeRefreshInterval();

    var refreshLineStatuses = function() {
        angular.forEach($scope.lineStatuses, function (value, key) {
            var status = TubeService.getLineStatus(value.lineName);
            status.then(function (result) {
                value.status = result.CurrentStatus;
                value.backColour = result.BackColor;
                value.foreColour = result.ForeColor;
            });
        });
        $scope.lastUpdated = new Date();
    };

    refreshLineStatuses();
    $interval(function () {
        refreshLineStatuses();
    }, tubeRefreshInterval, 0, true);
});