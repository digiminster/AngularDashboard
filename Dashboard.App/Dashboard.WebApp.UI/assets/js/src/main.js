angular.module('bootstrapApp', ['ui.bootstrap', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'assets/view/home.html',
            controller: 'HomeCtrl'

        })


        $urlRouterProvider.otherwise("/home");
    });

