angular.module('dashboardApp').controller('ServerCtrl', function($scope, ServerService, $interval, ConfigService) {

    var ips = ConfigService.getServerIps();
    $scope.serverScrollInterval = ConfigService.getServerScrollInterval();
    $scope.serverStats = [];
    var serverRefreshInterval = ConfigService.getServerRefreshInterval();

    function ServerStat(ipAddr) {
        this.ip = ipAddr;
        this.computerName = '';
        this.description = '';
        this.cpu = '';
        this.diskUsage = '';
        this.drives = [];
        this.memoryInfo = '';
    };

    for (var i = 0; i < ips.length; i += 4) {
        var serverStatA = new ServerStat(ips[i]);
        var serverStatB = new ServerStat('');
        var serverStatC = new ServerStat('');
        var serverStatD = new ServerStat('');

        if (i + 1 < ips.length) {
            serverStatB.ip = ips[i + 1];
        }
        if (i + 2 < ips.length) {
            serverStatC.ip = ips[i + 2];
        }
        if (i + 3 < ips.length) {
            serverStatD.ip = ips[i + 3];
        }

        var fourServerStats = {
            serverStatA: serverStatA,
            serverStatB: serverStatB,
            serverStatC: serverStatC,
            serverStatD: serverStatD
        };

        $scope.serverStats.push(fourServerStats);
    }

    var getStats = function() {
        angular.forEach($scope.serverStats, function(value, key) {
            var statsA = ServerService.getStats(value.serverStatA.ip);
            statsA.then(function(result) {
                populateServerStatProperties(value.serverStatA, result);
            });

            if (value.serverStatB.ip !== '') {
                var statsB = ServerService.getStats(value.serverStatB.ip);
                statsB.then(function (result) {
                    populateServerStatProperties(value.serverStatB, result);
                });
            }

            if (value.serverStatC.ip !== '') {
                var statsC = ServerService.getStats(value.serverStatC.ip);
                statsC.then(function (result) {
                    populateServerStatProperties(value.serverStatC, result);
                });
            }

            if (value.serverStatD.ip !== '') {
                var statsD = ServerService.getStats(value.serverStatD.ip);
                statsD.then(function (result) {
                    populateServerStatProperties(value.serverStatD, result);
                });
            }
        });
        $scope.lastUpdated = new Date();
    };

    function populateServerStatProperties(serverStat, result) {
        serverStat.computerName = result.ComputerName;
        serverStat.description = result.Description;
        serverStat.cpu = result.CPU;
        serverStat.diskUsage = result.DiskUsage;
        serverStat.drives = result.Drives;
        serverStat.memoryInfo = result.MemoryInfo;
    } 

    getStats();
    $interval(function() {
        getStats();
    }, serverRefreshInterval, 0, true);
});