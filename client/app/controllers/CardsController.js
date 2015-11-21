angular.module('app')
.controller('CardsController', function( $scope, $rootScope, $templateCache) {
    
    $scope.getExample = function(_example) {
      return $templateCache.get(_example);
    };

});