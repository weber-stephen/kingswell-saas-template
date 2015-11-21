angular.module('app')
.controller('ValidationController', function( $scope, $rootScope, $templateCache) {
  
  // Settings
  $scope.formData = {};

  $scope.submitted = false;

  $scope.submit = function() {
    $scope.submitted = true;
  };

  $scope.interacted = function(field) {
    return $scope.submitted || field.$dirty;
  };

  $scope.getExample = function(_example) {
    return $templateCache.get(_example);
  };

});