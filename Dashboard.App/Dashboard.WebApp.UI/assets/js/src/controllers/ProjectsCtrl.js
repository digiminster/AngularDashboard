angular.module('dashboardApp').controller('ProjectCtrl', function ($scope, ProjectService, ConfigService, $interval) {
    $scope.projects = ConfigService.getProjects();
    $scope.brokenBuilds = [];
    $scope.successBuilds = [];
    $scope.totalFailed = 0;
    $scope.totalSucceed = 0;
    var projectRefreshInterval = ConfigService.getProjectsRefreshInterval();

    /*we have to look at each project because the ones we are interested in are not necessarily the same set as the 
     *set of all projects that have > 0 broken builds, so we always have to iterate the full set of projects-of-interest*/
    var refreshBrokenBuilds = function () {
        angular.forEach($scope.projects, function (value, key) {
            var project = ProjectService.getProject(encodeURIComponent(value.name));
            project.then(function (result) {
                console.log('ProjectCtrl');
                //get project's builds and iterate looking for any broken ones, passing these to an array
                angular.forEach(result.Builds, function (innerValue, innerKey) {
                    if (innerValue.Status == "FAILURE" || innerValue.status == "ERROR") {
                        $scope.brokenBuilds.push(innerValue);
                    }
                    if (innerValue.Status == "SUCCESS") {
                        $scope.successBuilds.push(innerValue);
                    }
                });
            });
        });
        $scope.lastUpdated = new Date();
      //  $scope.totalFailed = brokenBuilds.length;
      //  $scope.totalSucceed = successBuilds.length;
    };

    refreshBrokenBuilds();
    $interval(function () {
        refreshBrokenBuilds();
    }, projectRefreshInterval, 0, true);
});