(function() {
    'use strict';
    angular.module('autopoolIoApp').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$http', 'LoginService', '$location'];

    function HomeCtrl($http, LoginService, $location) {
        var vm = this;

        vm.test = 'Hello World! ' + 42;

        vm.loginUser = function() {
            vm.message = null;
            vm.error = null;

            LoginService.$signInWithPopup("google").then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.user.displayName, firebaseUser.user.email);
                console.log('Info:', firebaseUser);
                $location.path('/loggedin');
            }).catch(function(error) {
                console.log("Authentication failed:", error);
            });
        };
    }
})();