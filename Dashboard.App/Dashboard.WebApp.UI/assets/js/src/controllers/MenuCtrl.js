angular.module('dashboardApp').controller('MenuCtrl', function ($scope) {

    $scope.showHideNavClass = "hidden";
    $scope.showHideBodyClass = "";

    $scope.showHideMenuButton = function () {
        if ($scope.showHideNavClass === "hidden") {
            $scope.showHideNavClass = "";
            $scope.showHideBodyClass = "drop";
        } else {
            $scope.showHideNavClass = "hidden";
            $scope.showHideBodyClass = "";
        }
    };
});