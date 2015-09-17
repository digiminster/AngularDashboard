angular.module('dashboardApp').controller('TrainCtrl', function ($scope, TrainService, $interval, ConfigService) {

    var routes = ConfigService.getTrainRoutes();
    $scope.trainScrollInterval = ConfigService.getTrainScrollInterval();
    $scope.departureTimes = [];
    var trainRefreshInterval = ConfigService.getTrainRefreshInterval();

    function Route(from, to) {
        this.from = from;
        this.to = to;
        this.departures = '';
    };

    for (var i = 0; i < routes.length; i += 2) {
        var routeA = new Route(routes[i].from, routes[i].to);
        var routeB = new Route('', '');

        if (i + 1 < routes.length) {
            routeB.from = routes[i + 1].from;
            routeB.to = routes[i + 1].to;
        }

        var twoRoutes = {
            routeA: routeA,
            routeB: routeB,
            secondRouteVisibility: ''
        };

        $scope.departureTimes.push(twoRoutes);
    }

    var getDepartures = function () {
        angular.forEach($scope.departureTimes, function (value, key) {
            var statuses = TrainService.getDepartures(value.routeA.from, value.routeA.to, value.routeB.from, value.routeB.to);
            statuses.then(function (result) {
                if (value.routeB.to === '' && value.routeB.from === '') {
                    value.routeA.departures = result.TrainServices;
                    value.secondRouteVisibility = "hidden";
                } else {
                    value.routeA.departures = result[0].TrainServices;
                    value.routeB.departures = result[1].TrainServices;
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