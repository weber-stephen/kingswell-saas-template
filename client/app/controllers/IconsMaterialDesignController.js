angular.module('app')
.controller('IconsMaterialDesignController', function( $scope, IconFactory) {
  
  $scope.icons = [];

  $scope.currentSize = 2;
  
  $scope.getMaterialDesignIcons = function() {

    IconFactory.getMaterialDesignIcons()
    .then(function(data) {
      Array.prototype.push.apply($scope.icons, data);
    });

  };

  $scope.getMaterialDesignIcons();

});