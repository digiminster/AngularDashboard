angular.module('dashboardApp').controller('TubeCtrl', function($scope, TubeService, $interval, ConfigService) {
    $scope.lines = ConfigService.getTubeLines();
    $scope.lineStatuses = [];
    $scope.tubeScrollInterval = ConfigService.getTubeScrollInterval();
    var tubeRefreshInterval = ConfigService.getTubeRefreshInterval();

    angular.forEach($scope.lines, function (value, key) {
        var lineStatus = { lineName: value, status: "", backColour: "", foreColour: "" };
        $scope.lineStatuses.push(lineStatus);
    });

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