angular.module('app')
.controller('IconsFontAwesomeController', function( $scope, IconFactory) {
  
  $scope.icons = [];

  $scope.currentSize = 2;

  $scope.getFontAwesomeIcons = function() {

    IconFactory.getFontAwesomeIcons()
    .then(function(data) {
      Array.prototype.push.apply($scope.icons, data);
    });

  };

  $scope.getFontAwesomeIcons();

});