//  This will control the map's positioning and what is displayed on the map
//  beyond the map's initial state
(function() {
    'use strict';

    angular.module('autopoolIoApp').controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['Data', '$rootScope'];

    function MapCtrl(Data, $rootScope) {
        var vm = this;

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 44.9778,
                lng: -93.2650
            },
            zoom: 10,
            disableDefaultUI: true,
            styles: [{
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{
                    color: '#558B2F'
                }]
            }, {
                featureType: 'road',
                elementType: 'labels',
                stylers: [{
                    saturation: -100
                }]
            }, {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    color: '#0D47A1'
                }]
            }, {
                featureType: 'water',
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'administrative',
                elementType: 'labels',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'all',
                stylers: [{
                    saturation: -50
                }]
            }]
        });
        // var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // infoWindow.setPosition(pos);
                // infoWindow.setContent('Location found.');
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }

        $rootScope.map = map;
    }
})();
