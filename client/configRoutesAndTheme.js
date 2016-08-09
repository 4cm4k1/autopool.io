(function() {
    angular.module('autopoolIoApp').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', configRoutesAndTheme]);

    function configRoutesAndTheme($routeProvider, $locationProvider, $mdThemingProvider) {
        //  Route config (with authentication checks)
        $routeProvider.when('/home', {
            controller: 'HomeCtrl as home',
            templateUrl: 'views/home.html'
        }).when('/onboard', {
          controller: 'OnboardCtrl as onboard',
          templateUrl: 'views/onboard.html',
          resolve: {
            'currentAuth': ['Auth', function(Auth){
              return Auth.$requireSignIn();
            }]
          }
        }).when('/group', {
          controller: 'GroupCtrl as group',
          templateUrl: 'views/group.html',
          resolve: {
            'currentAuth': ['Auth', function(Auth){
              return Auth.$requireSignIn();
            }]
          }
        }).when('/ride', {
          controller: 'RideCtrl as ride',
          templateUrl: 'views/ride.html',
          resolve: {
            'currentAuth': ['Auth', function(Auth){
              return Auth.$requireSignIn();
            }]
          }
        }).when('/settings', {
          controller: 'SettingsCtrl as settings',
          templateUrl: 'views/settings.html',
          resolve: {
            'currentAuth': ['Auth', function(Auth){
              return Auth.$requireSignIn();
            }]
          }
        }).when('/admin', {
          controller: 'SettingsAdminCtrl as admin',
          templateUrl: 'views/admin.html',
          resolve: {
            'currentAuth': ['Auth', function(Auth){
              return Auth.$requireSignIn();
            }]
          }
        }).otherwise({
          controller: 'HomeCtrl as home',
          templateUrl: 'views/home.html'
        });

        //  $locationProvider config
        $locationProvider.html5Mode(true);

        //  Angular Material theme config
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('light-green')
            .warnPalette('deep-orange');
    }
})();
