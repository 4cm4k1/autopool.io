//  This will control the badge that appears in the top-right corner when
//  a user is in an authenticated session
(function() {
    'use strict';

    angular.module('autopoolIoApp').controller('BadgeCtrl', BadgeCtrl);

    BadgeCtrl.$inject = ['Auth', '$location'];

    function BadgeCtrl(Auth, $location) {
        var vm = this;

        vm.auth = Auth;

        //  Sets vm.user to current user when auth state changes
        vm.auth.$onAuthStateChanged(function(firebaseUser) {
            vm.user = firebaseUser;
            console.log('BadgeCtrl:', vm.user);
        });

        //  Signs out the user and sets path to '/home'
        vm.signOut = function(){
            vm.auth.$signOut();
        };

        vm.goToSettings = function(){
            $location.path('/settings');
        };

        vm.goToAdminSettings = function(){
            $location.path('/admin');
        };
    }
})();
