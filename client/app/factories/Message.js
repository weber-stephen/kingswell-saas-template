angular.module('app')
.factory('MessageFactory', function($http,$rootScope,$log,$q){

  function get() {
    var defer = $q.defer();

    $http.get($rootScope.baseURL+'messages')
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  return {
    get:get
  };

});