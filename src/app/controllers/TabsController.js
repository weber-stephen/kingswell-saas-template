angular.module('app')
.controller('TabsController', function($scope, $templateCache) {
    
    //Settings

    $scope.getExample = function(_example) {
      return $templateCache.get(_example);
    };

});