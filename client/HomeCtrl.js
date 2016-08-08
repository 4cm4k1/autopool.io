(function() {
    'use strict';
    angular.module('autopoolIoApp').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$http', 'Auth', '$location'];

    function HomeCtrl($http, Auth, $location) {
        var vm = this;

        vm.test = 'Hello World! ' + 42;

        vm.loginUser = function() {
            vm.message = null;
            vm.error = null;

            Auth.$signInWithPopup("google").then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.user.displayName, firebaseUser.user.email);
                console.log('Info:', firebaseUser);
                $location.path('/onboard');
            }).catch(function(error) {
                console.log("Authentication failed:", error);
            });
        };
    }
})();
