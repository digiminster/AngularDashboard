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

        })

        .state('contact', {
            url: '/contact',
            templateUrl: 'assets/view/contact.html',
            controller: 'ContactCtrl'

        });


        $urlRouterProvider.otherwise("/home");
    });

