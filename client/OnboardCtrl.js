(function() {
    'use strict';
    angular.module('autopoolIoApp').controller('OnboardCtrl', OnboardCtrl);

    OnboardCtrl.$inject = ['$http', 'currentAuth', 'Auth', '$location'];

    function OnboardCtrl($http, currentAuth, Auth, $location) {
        var vm = this;

        vm.displayName = currentAuth.displayName;
        vm.photoURL = currentAuth.photoURL;
        vm.email = currentAuth.email;

        console.log('Signed in as:', vm.displayName, vm.email);
        console.log('Full user object:', currentAuth);

        Auth.$onAuthStateChanged(function(firebaseUser) {
          if(!firebaseUser) {
              $location.path('/home');
          }
        });


    }

})();
