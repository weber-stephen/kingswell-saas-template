angular.module('app')
.factory('IconFactory', function($http,$rootScope,$log,$q){

  function getFontAwesomeIcons() {
    var defer = $q.defer();

    $http.get('/data/FontAwesomeIcons.json')
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  function getMaterialDesignIcons() {
    var defer = $q.defer();

    $http.get('/data/MaterialDesignIcons.json')
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  return {
    getFontAwesomeIcons:getFontAwesomeIcons,
    getMaterialDesignIcons:getMaterialDesignIcons
  };

});