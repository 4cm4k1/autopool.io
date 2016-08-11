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
                console.log("Signed in as:", firebaseUser.user.displayName, firebaseUser.user.email);
                console.log('Info:', firebaseUser);

                Data.saveNewUser(firebaseUser.user.uid, firebaseUser.user.displayName, firebaseUser.user.email, firebaseUser.user.photoURL, firebaseUser.user.providerData[0].uid);

                console.log('Checked DB and found:', Data.getAndUpdateUserInfo(firebaseUser.user.uid));

                $location.path('/onboard');
            }).catch(function(error) {
                console.log("Authentication failed:", error);
            });
        };
    }
})();
