angular.module('dashboardApp').controller('TrainCtrl', function ($scope, TrainService, $interval, ConfigService) {

    var routes = ConfigService.getTrainRoutes();
    $scope.trainScrollInterval = ConfigService.getTrainScrollInterval();
    $scope.departureTimes = [];
    var trainRefreshInterval = ConfigService.getTrainRefreshInterval();

    for (var i = 0; i < routes.length; i += 2) {
        var departureTime = { fromA: routes[i].from, toA: routes[i].to, departuresA: '', fromB: '', toB: '', departuresB: '', secondRouteVisibility: '' };

        if (i + 1 < routes.length) {
            departureTime.fromB = routes[i + 1].from;
            departureTime.toB = routes[i + 1].to;
        }

        $scope.departureTimes.push(departureTime);
    }

    var getDepartures = function () {
        angular.forEach($scope.departureTimes, function (value, key) {
            var statuses = TrainService.getDepartures(value.fromA, value.toA, value.fromB, value.toB);
            statuses.then(function (result) {
                if (value.toB === '' && value.fromB === '') {
                    value.departuresA = result.TrainServices;
                    value.secondRouteVisibility = "hidden";
                } else {
                    value.departuresA = result[0].TrainServices;
                    value.departuresB = result[1].TrainServices;
                    value.secondRouteVisibility = "visible";
                }
            });
        });
        $scope.lastUpdated = new Date();
    };

    getDepartures();
    $interval(function () {
        getDepartures();
    }, trainRefreshInterval, 0, true);
});