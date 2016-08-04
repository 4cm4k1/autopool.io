(function() {
    angular.module('autopoolIoApp').config(['$routeProvider', '$locationProvider', routeViews]);

    function routeViews($routeProvider, $locationProvider) {
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
        }).when('/loggedin', {
          controller: 'LoggedInCtrl as loggedin',
          templateUrl: 'views/loggedin.html',
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
    }
})();
