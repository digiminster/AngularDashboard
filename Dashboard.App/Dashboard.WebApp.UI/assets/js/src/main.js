angular.module('dashboardApp', [
    'ui.bootstrap', 
    'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'assets/view/home.html',
            controller: 'HomeCtrl'

        })
        
        .state('about', {
            url: '/about',
            templateUrl: 'assets/view/about.html',
            controller: 'AboutCtrl'

        });


        $urlRouterProvider.otherwise("/home");
    });

