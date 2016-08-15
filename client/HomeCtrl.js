(function() {
    'use strict';
    angular.module('autopoolIoApp').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$http', 'Auth', '$location', 'Data'];

    function HomeCtrl($http, Auth, $location, Data) {
        var vm = this;

        Auth.$onAuthStateChanged(function(firebaseUser){
            if(firebaseUser) {
                $location.path('/onboard');
            }
        });

        vm.loginUser = function() {
            vm.message = null;
            vm.error = null;

            Auth.$signInWithPopup("google").then(function(firebaseUser) {

                vm.something = Data.getUser(firebaseUser.user.uid);

                vm.something.$loaded().then(function(obj){
                    if(obj.displayName){
                        console.log('user exists!');
                    } else {
                        console.log('user does not exist!');
                        Data.saveNewUser(firebaseUser.user.uid, firebaseUser.user.displayName, firebaseUser.user.email, firebaseUser.user.photoURL, firebaseUser.user.providerData[0].uid);
                    }
                });

                $location.path('/onboard');
            }).catch(function(error) {
                console.log("Authentication failed:", error);
            });
        };
    }
})();
