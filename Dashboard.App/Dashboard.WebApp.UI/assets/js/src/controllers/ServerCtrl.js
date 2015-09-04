angular.module('dashboardApp').controller('ServerCtrl', function ($scope, ServerService, $interval, ConfigService) {

    var ips = ConfigService.getServerIps();
    $scope.serverScrollInterval = ConfigService.getServerScrollInterval();
    $scope.serverStats = [];
    var serverRefreshInterval = ConfigService.getServerRefreshInterval();

    angular.forEach(ips, function (value, key) {
        var serverStat = { ip: value, computerName: '', description: '', cpu: '', diskUsage: '', drives: [], memoryInfo: '' };
        $scope.serverStats.push(serverStat);
    });

    var getStats = function() {
        angular.forEach($scope.serverStats, function(value, key) {
            var stats = ServerService.getStats(value.ip);
            stats.then(function(result) {
                value.computerName = result.ComputerName;
                value.description = result.Description;
                value.cpu = result.CPU;
                value.diskUsage = result.DiskUsage;
                value.drives = result.Drives;
                value.memoryInfo = result.MemoryInfo;
            });
        });
        $scope.lastUpdated = new Date();
    };

    getStats();
    $interval(function() {
        getStats();
    }, serverRefreshInterval, 0, true);
});