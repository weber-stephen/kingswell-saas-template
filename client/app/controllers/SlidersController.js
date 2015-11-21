angular.module('app')
.controller('SlidersController', function( $scope, $rootScope, $templateCache) {
    
  var self = this;

  // Settings
  $scope.data = {
    slider:0,
    intervalSlider:0,
    disabledSlider:0,
    disabledDiscreteSlider:0
  };

  $scope.getExample = function(_example) {
    return $templateCache.get(_example);
  };

});