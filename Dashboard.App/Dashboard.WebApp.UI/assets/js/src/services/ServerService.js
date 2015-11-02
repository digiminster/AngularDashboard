angular.module('dashboardApp').factory('ServerService', function ($http, ConfigService) {
    var serverService = {};

    function serverStat(ipAddr) {
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
    };

    serverService.getStats = function (ip) {
        if (navigator.onLine) {
            return $http.get(ConfigService.getDashboardServiceBaseUrl() + 'SystemMonitor/' + ip, { cache: false, timeout: 5000 })
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    console.log('Error getting server status: ' + error);
                    return -1;
                });
        }

        return null;
    };

    serverService.createStatsArray = function (ips, serversPerSlide) {
        var serverStats = [];

        for (var i = 0; i < ips.length; i += serversPerSlide) {

            var innerArray = [];

            for (var j = 0; j < serversPerSlide; j++) {
                var serverStatObj = new serverStat('');

                if (i + j < ips.length) {
                    serverStatObj.ip = ips[i + j];
                    innerArray.push(serverStatObj);
                }
            }

            serverStats.push(innerArray);
        }

        return serverStats;
    };

    serverService.populateServerStatProperties = function(serverStatIn, result) {
        serverStatIn.computerName = result.ComputerName;
        serverStatIn.description = result.Description;

        serverStatIn.cpu = result.CPU / 100;
        serverStatIn.cpuDisplayNbr = result.CPU;

        serverStatIn.diskUsage = result.DiskUsage / 100;
        serverStatIn.diskUsageDisplayNbr = result.DiskUsage;

        serverStatIn.drives = result.Drives;

        angular.forEach(serverStatIn.drives, function(value, key) {
            value.InUsePercentageDisplayNbr = value.InUsePercentage / 100;
            value.DriveLetter = value.DriveLetter.toUpperCase();
        });

        serverStatIn.memoryInfo = result.MemoryInfo.InUsePercentage / 100;
        serverStatIn.memoryInfoDisplayNbr = result.MemoryInfo.InUsePercentage;
    };

    return serverService;
});