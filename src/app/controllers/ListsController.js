angular.module('app')
.controller('ListsController', function( $scope, $rootScope, $mdDialog, $timeout, $templateCache, MessageFactory) {
    
  $scope.messages = [];

  var originatorEv;

  $scope.openMessageMenu = function($mdOpenMenu, ev) {
    console.log('openMessageMenu');
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.getMessages = function() {
    MessageFactory.get()
    .then(function(data) {
      $scope.messages = data;
    });
  }

  $scope.getExample = function(_example) {
    return $templateCache.get(_example);
  };

  $scope.getMessages();

});