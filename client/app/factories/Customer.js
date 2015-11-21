angular.module('app')
.factory('CustomerFactory', function($http,$rootScope,$log,$q){

  function get() {
    var defer = $q.defer();

    $http.get($rootScope.baseURL+'customers')
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  return {
    get:get
  };

});