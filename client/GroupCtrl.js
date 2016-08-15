//  This will control the view in which users can select carpool members and/or
//  approve groupings.
(function() {
    'use strict';

    angular.module('autopoolIoApp').controller('GroupCtrl', GroupCtrl);

    GroupCtrl.$inject = ['Data', 'currentAuth', '$rootScope', 'filterFilter', '$scope'];

    function GroupCtrl(Data, currentAuth, $rootScope, filterFilter, $scope) {
        var vm = this;

        vm.map = $rootScope.map;

        vm.selectedUsers = [];

        vm.currentAuth = currentAuth;

        vm.user = Data.getUser(currentAuth.uid);

        vm.users = Data.getUsers();

        vm.users.$loaded().then(function(users) {
            console.log('users:', users);
        });

        // helper method to get selected fruits
        vm.selection = function selection() {
            return filterFilter(vm.users, {
                selected: true
            });
        };

        // watch fruits for changes
        $scope.$watch('group.users|filter:{selected:true}', function(nv) {
            vm.selectedUsers = nv.map(function(user) {
                return user;
            });
            vm.makeMarkers();
        }, true);

        vm.test = function() {
            console.log('selected users:', vm.selectedUsers);
        };

        vm.markers = [];

        vm.makeMarkers = function() {
            console.log('selected users:', vm.selectedUsers);
            console.log('doing something');
            vm.markers = [];

            for (var i = 0; i < vm.selectedUsers.length; i++) {
                var loc = new google.maps.LatLng(vm.selectedUsers[i].startPointLat, vm.selectedUsers[i].startPointLong);

                console.log(loc);

                vm.marker = new google.maps.Marker({
                    map: vm.map,
                    animation: google.maps.Animation.DROP,
                    position: loc
                });

                vm.marker.setVisible(true);

                vm.markers.push(vm.marker);
            }

        };

        vm.calculateRoute = function(){
          var waypts = [];
          for (var i = 0; i < vm.selectedUsers.length; i++) {
              waypts.push({
                  location: vm.selectedUsers[i].startPoint,
                  stopover: true
              });
          }

          var directionsDisplay = new google.maps.DirectionsRenderer({
              map: vm.map
          });

          // Set destination, origin and travel mode.
          var request = {
              destination: vm.user.endPoint,
              origin: vm.user.startPoint,
              waypoints: waypts,
              optimizeWaypoints: true,
              travelMode: 'DRIVING'
          };

          // Pass the directions request to the directions service.
          var directionsService = new google.maps.DirectionsService();
          directionsService.route(request, function(response, status) {
              if (status == 'OK') {
                  // Display the route on the map.
                  console.log(response);
                  directionsDisplay.setDirections(response);
              }
          });
        };

    }
})();
