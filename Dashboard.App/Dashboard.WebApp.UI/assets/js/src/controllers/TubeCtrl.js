angular.module('dashboardApp').controller('TubeCtrl', function($scope, TubeService, $timeout) {

    var lines = ["Jubilee", "District", "Circle", "Victoria", "Northern", "Piccadilly", "Central", "Bakerloo"];

    var getTubeStatus = function (lineIndex, delay) {
        $timeout(function () {
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

                getTubeStatus(lineIndex, 10000);
            });
        }, delay, true);
    };

    getTubeStatus(0, 0);
});