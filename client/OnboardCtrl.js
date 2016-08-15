(function() {
    'use strict';
    angular.module('autopoolIoApp').controller('OnboardCtrl', OnboardCtrl);

    OnboardCtrl.$inject = ['$http', 'currentAuth', 'Auth', '$location', 'Data', '$rootScope'];

    function OnboardCtrl($http, currentAuth, Auth, $location, Data, $rootScope) {
        var vm = this;

        vm.user = Data.getUser(currentAuth.uid);

        vm.user.$loaded().then(function() {
            if (vm.user.startPoint && vm.user.startPointPlaceID && vm.user.endPoint && vm.user.endPointPlaceID && vm.user.phoneNumber && vm.user.role) {
                console.log('User already onboarded, redirecting...');
                $location.path('/group');
            }
        });


        vm.user.startPoint = '';
        vm.user.startPointPlaceID = '';
        vm.user.endPoint = '';
        vm.user.endPointPlaceID = '';
        vm.user.phoneNumber = '';
        vm.user.role = '';

        vm.submitOnboardInfo = function() {
            vm.user.modDate = firebase.database.ServerValue.TIMESTAMP;
            vm.user.$save().then(function() {
                console.log('Onboard info saved:', vm.user.displayName, vm.user.$id);
            }).catch(function(error) {
                console.error('Error:', error);
            });
        };

        Auth.$onAuthStateChanged(function(firebaseUser) {
            if (!firebaseUser) {
                $location.path('/home');
            }
        });

        //  Google Maps Autocomplete

        var placeSearch, autocomplete1, autocomplete2;
        initAutocomplete();

        function initAutocomplete() {
            // Create the autocomplete1 object, restricting the search to geographical
            // location types.

            vm.map = $rootScope.map;

            autocomplete1 = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */
                (document.getElementById('autocomplete1')), {
                    types: ['geocode']
                });
            autocomplete2 = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */
                (document.getElementById('autocomplete2')), {
                    types: ['geocode']
                });

            vm.marker1 = new google.maps.Marker({
                map: vm.map,
                animation: google.maps.Animation.DROP,
                anchorPoint: new google.maps.Point(0, -29),
                icon: '/assets/vendors/home.svg'
            });
            vm.marker2 = new google.maps.Marker({
                map: vm.map,
                animation: google.maps.Animation.DROP,
                anchorPoint: new google.maps.Point(0, -29),
                icon: '/assets/vendors/work.svg'
            });

            // When the user selects an address from the dropdown, populate the address
            // fields in the form.
            autocomplete1.addListener('place_changed', fillInAddress1);
            autocomplete2.addListener('place_changed', fillInAddress2);
        }

        function fillInAddress1() {
            // Get the place details from the autocomplete1 object.
            vm.marker1.setVisible(false);
            var place = autocomplete1.getPlace();
            // if (place.geometry.viewport) {
            //     vm.map.fitBounds(place.geometry.viewport);
            // } else {
            //     vm.map.setCenter(place.geometry.location);
            // }
            vm.marker1.setPosition(place.geometry.location);
            vm.marker1.setVisible(true);

            vm.user.startPoint = place.formatted_address;
            vm.user.startPointPlaceID = place.place_id;
            vm.user.startPointLat = place.geometry.location.lat();
            vm.user.startPointLong = place.geometry.location.lng();
        }

        function fillInAddress2() {
            // Get the place details from the autocomplete1 object.
            vm.marker2.setVisible(false);
            var place = autocomplete2.getPlace();
            // if (place.geometry.viewport) {
            //     vm.map.fitBounds(place.geometry.viewport);
            // } else {
            //     vm.map.setCenter(place.geometry.location);
            // }
            vm.marker2.setPosition(place.geometry.location);
            vm.marker2.setVisible(true);

            vm.user.endPoint = place.formatted_address;
            vm.user.endPointPlaceID = place.place_id;
            vm.user.endPointLat = place.geometry.location.lat();
            vm.user.endPointLong = place.geometry.location.lng();
        }

        // Bias the autocomplete1 object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
        vm.geolocate = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var geolocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var circle = new google.maps.Circle({
                        center: geolocation,
                        radius: position.coords.accuracy
                    });
                    autocomplete1.setBounds(circle.getBounds());
                    autocomplete2.setBounds(circle.getBounds());
                });
            }
        };


    }

})();
