(function() {
    'use strict';
    angular.module('autopoolIoApp').run(['$rootScope', '$location', redirectHome]);

    function redirectHome($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
            if (error === 'AUTH_REQUIRED') {
                $location.path('/home');
            }
        });
    }

})();
