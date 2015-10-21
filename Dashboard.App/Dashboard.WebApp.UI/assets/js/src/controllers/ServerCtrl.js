angular.module('dashboardApp').controller('ServerCtrl', function($scope, ServerService, $interval, ConfigService) {

    var ips = ConfigService.getServerIps();
    var serverRefreshInterval = ConfigService.getServerRefreshInterval();

    $scope.serverScrollInterval = ConfigService.getServerScrollInterval();
    $scope.serverStats = ServerService.createStatsArray(ips, ConfigService.getServersPerSlide());
    $scope.circleBackground = 'grey';
    $scope.bigCircleStroke = 'yellow';
    $scope.smallCircleStroke = 'blue';
    $scope.bigCircleSize = 70;
    $scope.smallCircleSize = 60;
    $scope.bigCircleWidth = 10;
    $scope.smallCircleWidth = 9;

    var getStats = function () {
        angular.forEach($scope.serverStats, function (value, key) {
            angular.forEach(value, function (innerValue, innerKey) {
                var stats = ServerService.getStats(innerValue.ip);
                stats.then(function (result) {
                    ServerService.populateServerStatProperties(innerValue, result);
                });
            });
        });
        $scope.lastUpdated = new Date();
    };

    getStats();
    $interval(function() {
        getStats();
    }, serverRefreshInterval, 0, true);
});