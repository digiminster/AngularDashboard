angular.module('dashboardApp').controller('ServerCtrl', function($scope, ServerService, $interval, ConfigService) {

    var ips = ConfigService.getServerIps();
    var serverRefreshInterval = ConfigService.getServerRefreshInterval();

    $scope.serverScrollInterval = ConfigService.getServerScrollInterval();
    $scope.serverStats = [];
    $scope.circleBackground = 'grey';
    $scope.bigCircleStroke = 'yellow';
    $scope.smallCircleStroke = 'blue';
    $scope.bigCircleSize = 70;
    $scope.smallCircleSize = 60;
    $scope.bigCircleWidth = 10;
    $scope.smallCircleWidth = 9;

    function ServerStat(ipAddr) {
        this.ip = ipAddr;
        this.computerName = '';
        this.description = '';

        this.cpuLabel = 'CPU';
        this.cpuDisplayNbr = '';
        this.cpu = '';

        this.diskUsage = '';
        this.diskUsageLabel = 'Disk';
        this.diskUsageDisplayNbr = '';

        this.drives = [];

        this.memoryInfoLabel = 'Memory';
        this.memoryInfo = '';
        this.memoryInfoDisplayNbr = '';

        this.visibility = '';
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

        var innerArray = [];

        innerArray.push(serverStatA);
        innerArray.push(serverStatB);
        innerArray.push(serverStatC);
        innerArray.push(serverStatD);

        $scope.serverStats.push(innerArray);
    }

    var getStats = function() {
        angular.forEach($scope.serverStats, function (value, key) {
            angular.forEach(value, function(innerValue, innerKey) {
                if (innerValue.ip !== '') {
                    var stats = ServerService.getStats(innerValue.ip);
                    stats.then(function(result) {
                        populateServerStatProperties(innerValue, result);
                        innerValue.visibility = 'visible';
                    });
                } else {
                    innerValue.visibility = 'hidden';
                }
            });
        });
        $scope.lastUpdated = new Date();
    };

    function populateServerStatProperties(serverStat, result) {
        serverStat.computerName = result.ComputerName;
        serverStat.description = result.Description;

        serverStat.cpu = result.CPU / 100;
        serverStat.cpuDisplayNbr = result.CPU;

        serverStat.diskUsage = result.DiskUsage / 100;
        serverStat.diskUsageDisplayNbr = result.DiskUsage;

        serverStat.drives = result.Drives;

        angular.forEach(serverStat.drives, function (value, key) {
            value.InUsePercentageDisplayNbr = value.InUsePercentage / 100;
            value.DriveLetter = value.DriveLetter.toUpperCase();
        });

        serverStat.memoryInfo = result.MemoryInfo.InUsePercentage / 100;
        serverStat.memoryInfoDisplayNbr = result.MemoryInfo.InUsePercentage;
    } 

    getStats();
    $interval(function() {
        getStats();
    }, serverRefreshInterval, 0, true);
});