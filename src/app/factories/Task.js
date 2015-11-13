angular.module('app')
.factory('TaskFactory', function($http,$rootScope,$log,$q){

  function get() {
    var defer = $q.defer();

    $http.get($rootScope.baseURL+'tasks')
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  return {
    get:get
  };

});