(function() {
    angular.module('autopoolIoApp').config(['$routeProvider', '$locationProvider', '$mdThemingProvider', configRoutesAndTheme]);

    function configRoutesAndTheme($routeProvider, $locationProvider, $mdThemingProvider) {
        $routeProvider.when('/home', {
            // the rest is the same for ui-router and ngRoute...
            controller: 'HomeCtrl as home',
            templateUrl: 'views/home.html'
            // resolve: {
                // controller will not be loaded until $waitForSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                // "currentAuth": ["Auth", function(Auth) {
                    // $waitForSignIn returns a promise so the resolve waits for it to complete
                //     return Auth.$waitForSignIn();
                // }]
            // }
        }).when('/onboard', {
          controller: 'OnboardCtrl as onboard',
          templateUrl: 'views/onboard.html',
          resolve: {
            'currentAuth': ['LoginService', function(LoginService){
              return LoginService.$requireSignIn();
            }]
          }
        }).when('/group', {
          controller: 'GroupCtrl as group',
          templateUrl: 'views/group.html',
          resolve: {
            'currentAuth': ['LoginService', function(LoginService){
              return LoginService.$requireSignIn();
            }]
          }
        }).when('/ride', {
          controller: 'RideCtrl as ride',
          templateUrl: 'views/ride.html',
          resolve: {
            'currentAuth': ['LoginService', function(LoginService){
              return LoginService.$requireSignIn();
            }]
          }
        }).when('/settings', {
          controller: 'SettingsCtrl as settings',
          templateUrl: 'views/settings.html',
          resolve: {
            'currentAuth': ['LoginService', function(LoginService){
              return LoginService.$requireSignIn();
            }]
          }
        }).otherwise({
          controller: 'HomeCtrl as home',
          templateUrl: 'views/home.html'
        });

        $locationProvider.html5Mode(true);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('light-green')
            .warnPalette('deep-orange');
    }
})();
