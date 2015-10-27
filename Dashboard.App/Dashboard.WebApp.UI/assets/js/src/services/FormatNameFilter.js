angular.module('dashboardApp').filter('FormatName', function () {
    return function (name) {
        return name.replace(/_/g, " ");
    }
}
);
