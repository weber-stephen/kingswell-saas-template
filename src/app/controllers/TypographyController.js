angular.module('app')
.controller('TypographyController', function( $scope, $rootScope, $templateCache) {
    
    //Settings

    $scope.getExample = function(_example) {
      return $templateCache.get(_example);
    };

});