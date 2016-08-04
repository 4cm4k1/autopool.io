(function() {
    'use strict';
    angular.module('autopoolIoApp').factory('LoginService', ['$firebaseAuth', LoginService]);

    function LoginService($firebaseAuth) {
        return $firebaseAuth();
    }

})();
