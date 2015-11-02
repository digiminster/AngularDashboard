angular.module('dashboardApp').controller('ProjectCtrl', function ($scope, ProjectService, ConfigService, $interval) {
    var projectList = ConfigService.getProjects();

    var projectRefreshInterval = ConfigService.getProjectsRefreshInterval();
    $scope.projectScrollInterval = ConfigService.getProjectScrollInterval();

    $scope.projectDataList = ProjectService.createProjectArray(projectList, ConfigService.getProjectsPerSlide());

    var getData = function () {
        angular.forEach($scope.projectDataList, function (value, key) {
            angular.forEach(value, function (innerValue, innerKey) {
                var projectStatus = ProjectService.getProject(innerValue.projectName);
                projectStatus.then(function (result) {
                    innerValue.builds = result.Builds;
                });
            });
        });
        $scope.lastUpdated = new Date();
    };

    getData();
    $interval(function () {
        getData();
    }, projectRefreshInterval, 0, true);
});

angular.module('dashboardApp').filter('DateFrom', function () {
      return  function(input) {
         moment(input, "YYYYMMDD").fromNow();
    }
});