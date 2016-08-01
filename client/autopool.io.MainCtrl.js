(function() {
    'use strict';
    angular.module('autopoolIoApp').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$http'];

    function MainCtrl($http) {
        var vm = this;

        vm.test = 'Hello World! ' + 42;
    }
})();
