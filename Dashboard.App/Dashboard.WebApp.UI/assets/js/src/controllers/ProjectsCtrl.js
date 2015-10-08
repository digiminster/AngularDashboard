angular.module('dashboardApp').controller('ProjectCtrl', function ($scope, ProjectService, ConfigService, $interval) {
    var projectList = ConfigService.getProjects();

    var projectRefreshInterval = ConfigService.getProjectsRefreshInterval();
    $scope.projectScrollInterval = ConfigService.getProjectScrollInterval();

    $scope.projectDataList = [];

    function projectData(projectName) {
        this.projectName = projectName;
        this.builds = [];
    };

    for (var i = 0; i < projectList.length; i += 4) {
        var projectA = new projectData(projectList[i]);
        var projectB = new projectData('');
        var projectC = new projectData('');
        var projectD = new projectData('');

        if (i + 1 < projectList.length) {
            projectB.projectName = projectList[i + 1];
        }
        if (i + 2 < projectList.length) {
            projectC.projectName = projectList[i + 2];
        }
        if (i + 3 < projectList.length) {
            projectD.projectName = projectList[i + 3];
        }

        var innerArray = [];

        innerArray.push(projectA);
        innerArray.push(projectB);
        innerArray.push(projectC);
        innerArray.push(projectD);
        $scope.projectDataList.push(innerArray);
        console.log($scope.projectDataList);
    }


    var getData = function () {
        angular.forEach(projectList, function (value, key) {
            angular.forEach(value, function (innerValue, innerKey) {
                if (value.projectName !== '') {
                    var project = ProjectService.getProject(encodeURIComponent(value.name));
                    project.then(function (result) {
                        var projectBuilds = [];  
                        angular.forEach(result.Builds, function (dataValue, innerKey) {
                            projectBuilds.push(dataValue);
                        });
                        value.builds = projectBuilds;
                         value.visibility = 'visible';
                    });
                } else {
                    value.visibility = 'hidden';
                }
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