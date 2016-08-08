(function() {
    'use strict';
    angular.module('autopoolIoApp').factory('Auth', ['$firebaseAuth', Auth]);

    function Auth($firebaseAuth) {
        return $firebaseAuth();
    }

})();
