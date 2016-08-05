(function() {
    'use strict';
    angular.module('autopoolIoApp').controller('OnboardCtrl', OnboardCtrl);

    OnboardCtrl.$inject = ['$http', 'currentAuth'];

    function OnboardCtrl($http, currentAuth) {
        var vm = this;

        vm.displayName = currentAuth.displayName;
        vm.photoURL = currentAuth.photoURL;
        vm.email = currentAuth.email;

        console.log('Signed in as:', vm.displayName, vm.email);
        console.log('Full user object:', currentAuth);
        // currentAuth.$onAuthStateChanged(function(firebaseUser) {
        //     vm.firebaseUser = firebaseUser;
        //     console.log('firebaseUser:', vm.firebaseUser);
        // });
    }

})();
