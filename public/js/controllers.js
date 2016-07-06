'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth) {
  console.log('mainCtrl!');

  $scope.isAuthenticated = () => $auth.isAuthenticated();

  $scope.logout = () => {
    $auth.logout();
    $state.go('home');
  };

  $scope.authenticate = provider => {
    $auth.authenticate(provider)
      .then(res => {
        $state.go('home');
      })
      .catch(err => {
        console.log('err:', err);
      })
  };

});


app.controller('loginCtrl', function($scope, $state, $auth) {
  console.log('loginCtrl!');

  $state.login = () => {

  };

});


app.controller('registerCtrl', function($scope, $state, $auth) {
  console.log('registerCtrl!');

  $state.register = () => {

  };

});




app.controller('profileCtrl', function($scope, Profile) {
  console.log('profileCtrl!');

  $scope.user = Profile;

});

