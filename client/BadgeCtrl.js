//  This will control the badge that appears in the top-right corner when
//  a user is in an authenticated session
(function() {
    'use strict';

    angular.module('autopoolIoApp').controller('BadgeCtrl', BadgeCtrl);

    BadgeCtrl.$inject = ['Auth'];

    function BadgeCtrl(Auth) {
        var vm = this;

        vm.auth = Auth;

        vm.auth.$onAuthStateChanged(function(firebaseUser) {
            vm.user = firebaseUser;
            console.log('BadgeCtrl:', vm.user);
        });
    }
})();
