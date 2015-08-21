angular.module('dashboardApp').controller('TubeCtrl', function($scope, TubeService, $interval, ConfigService) {

    var lines = ConfigService.getTubeLines();

    var getTubeStatus = function (lineIndex, delay) {
        $interval(function () {
            var status = TubeService.getLineStatus(lines[lineIndex]);
            status.then(function (result) {
                $scope.lineName = lines[lineIndex];
                $scope.status = result.CurrentStatus;
                $scope.backColour = result.BackColor;
                $scope.foreColour = result.ForeColor;

                lineIndex++;

                if (lineIndex === lines.length) {
                    lineIndex = 0;
                }

                $scope.lastUpdated = new Date();
            });
        }, delay, 0, true);
    };

    getTubeStatus(0, ConfigService.getTubeRefreshInterval());
});