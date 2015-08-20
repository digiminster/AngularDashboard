angular.module('dashboardApp').controller('TrainCtrl', function($scope, TrainService, $timeout) {

    var routes = [{ from: "KGX", to: "SVG" }, { from: "HUL", to: "KGX" }, { from: "CPM", to: "PAD" }];

    var getDepartures = function (routeIndex, delay) {
        $timeout(function () {
            var status = TrainService.getDepartures(routes[routeIndex].from, routes[routeIndex].to);
            status.then(function (result) {
                $scope.route = routes[routeIndex].from + ' to ' + routes[routeIndex].to;
                $scope.departures = result.TrainServices;

                routeIndex++;

                if (routeIndex === routes.length) {
                    routeIndex = 0;
                }

                getDepartures(routeIndex, 10000);
            });
        }, delay, true);
    };

    getDepartures(0, 0);
});