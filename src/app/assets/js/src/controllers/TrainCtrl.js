require('../services/TrainService.js');
require('../services/ConfigService.js');

angular.module('dashboardApp').controller('TrainCtrl', function ($scope, TrainService, $interval, ConfigService) {

    var routes = ConfigService.getTrainRoutes();
    $scope.trainScrollInterval = ConfigService.getTrainScrollInterval();

    $scope.departureTimes = TrainService.createTrainArray(routes, ConfigService.getTrainsPerSlide());
    var trainRefreshInterval = ConfigService.getTrainRefreshInterval();

    var getDepartures = function () {
        angular.forEach($scope.departureTimes, function (value, key) {
            angular.forEach(value, function(innerValue, innerKey) {
                var status = TrainService.getDepartures(innerValue.from, innerValue.to);
                status.then(function(result) {
                    innerValue.departures = result.TrainServices;
                });
            });
        });
        $scope.lastUpdated = new Date();
    };

    getDepartures();
    $interval(function () {
        getDepartures();
    }, trainRefreshInterval, 0, true);
});