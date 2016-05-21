require('../lib/angular.min.js');
require('../lib/angular-ui-router.min.js');
require('../lib/ui-bootstrap-tpls-0.12.1.min.js');
require('../lib/angular-progress-arc.js');
require('../lib/angular-progress-arc.min.js');
require('../lib/moment.js');
require('../lib/pretty-date.js');

angular.module('dashboardApp', [
    'ui.bootstrap', 
    'ui.router',
    'angular-progress-arc'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'assets/view/home.html',
            controller: 'HomeCtrl',
            resolve: {
                config : function(ConfigService) {
                    return ConfigService.loadFile();
                }
            }               
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


/* -- Controllers -- */
require('./controllers/HomeCtrl.js');
require('./controllers/MenuCtrl.js');
require('./controllers/AboutCtrl.js');
require('./controllers/ProjectsCtrl.js');
require('./controllers/FogbugzCtrl.js');
require('./controllers/TubeCtrl.js');
require('./controllers/TrainCtrl.js');
require('./controllers/ServerCtrl.js');
require('./controllers/ProjectsCtrl.js');