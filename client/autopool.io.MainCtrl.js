(function() {
    'use strict';
    angular.module('autopoolIoApp').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$http', 'LoginService'];

    function MainCtrl($http, LoginService) {
        var vm = this;

        vm.test = 'Hello World! ' + 42;

        vm.loginUser = function() {
            vm.message = null;
            vm.error = null;

            LoginService.$signInWithPopup("google").then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.user.displayName, firebaseUser.user.email);
                console.log('Info:', firebaseUser);
            }).catch(function(error) {
                console.log("Authentication failed:", error);
            });
        };

        // var auth = $firebaseAuth();
        //
        // // login with Google
        // auth.$signInWithPopup("google").then(function(firebaseUser) {
        //   console.log("Signed in as:", firebaseUser.uid);
        // }).catch(function(error) {
        //   console.log("Authentication failed:", error);
        // });
    }
})();
