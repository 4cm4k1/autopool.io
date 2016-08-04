(function() {
    'use strict';
    angular.module('autopoolIoApp').controller('LoggedInCtrl', LoggedInCtrl);

    LoggedInCtrl.$inject = ['$http', 'LoginService', 'currentAuth'];

    function LoggedInCtrl($http, LoginService, currentAuth) {
        var vm = this;

        vm.displayName = currentAuth.displayName;

        console.log('Signed in as:', vm.displayName);
        // currentAuth.$onAuthStateChanged(function(firebaseUser) {
        //     vm.firebaseUser = firebaseUser;
        //     console.log('firebaseUser:', vm.firebaseUser);
        // });
    }

})();
