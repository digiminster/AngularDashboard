angular.module('dashboardApp').controller('TrainCtrl', function($scope, TrainService, $interval, ConfigService) {

    var routes = ConfigService.getTrainRoutes();

    var getDepartures = function (routeIndexA, routeIndexB, delay) {
        $interval(function () {

            var statusA = TrainService.getDepartures(routes[routeIndexA].from, routes[routeIndexA].to);
            statusA.then(function (result) {
                $scope.routeA = routes[routeIndexA].from + ' to ' + routes[routeIndexA].to;
                $scope.departuresA = result.TrainServices;

                routeIndexA += 2;

                if (routeIndexA >= routes.length) {
                    routeIndexA = 0;
                }
            });

            if (routeIndexB <= routes.length) {
                var statusB = TrainService.getDepartures(routes[routeIndexB].from, routes[routeIndexB].to);
                statusB.then(function(result) {
                    $scope.routeB = routes[routeIndexB].from + ' to ' + routes[routeIndexB].to;
                    $scope.departuresB = result.TrainServices;

                    routeIndexB += 2;

                    if (routeIndexB >= routes.length) {
                        routeIndexB = 1;
                    }
                });
            } else {
                $scope.routeB = "";
                $scope.departuresB = "";
            }

            $scope.lastUpdated = new Date();

        }, delay, 0, true);
    };

    getDepartures(0, 1, ConfigService.getTrainRefreshInterval());
});