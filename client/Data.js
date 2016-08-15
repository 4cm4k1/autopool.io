//  This will be the data factory service
(function() {
    'use strict';

    angular.module('autopoolIoApp').factory('Data', ['$firebaseObject', '$firebaseArray', Data]);

    function Data($firebaseObject, $firebaseArray) {
        var data = {};

        //  Save new user
        data.saveNewUser = function(firebaseUid, displayName, googleEmail, photoURL, googleUid) {
            var ref = firebase.database().ref();
            var userRef = ref.child('users').child(firebaseUid);

            var user = $firebaseObject(userRef);

            user.displayName = displayName;
            user.googleEmail = googleEmail;
            user.photoURL = photoURL;
            user.googleUid = googleUid;
            user.startPoint = null;
            user.endPoint = null;
            user.contactEmail = null;
            user.phoneNumber = null;
            user.phoneType = null;
            user.role = {
                type: null,
                distances: null
            };
            user.latLong = null;
            user.createDate = firebase.database.ServerValue.TIMESTAMP;
            user.modDate = firebase.database.ServerValue.TIMESTAMP;
            user.isAdmin = false;
            user.isAuth = false;

            user.$save().then(function() {
                console.log('New user saved:', user.displayName, user.$id);
            }).catch(function(error) {
                console.error('Error:', error);
            });

            return user;
        };

        data.getUser = function(uid) {
            var ref = firebase.database().ref().child('users');
            return $firebaseObject(ref.child(uid));
        };

        //  Make data methods publicly available to rest of app
        return data;
    }
})();
