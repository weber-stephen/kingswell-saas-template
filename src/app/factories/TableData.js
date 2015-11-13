angular.module('app')
.factory('TableDataFactory', function($http,$rootScope,$log,$q){

  function get() {
    var defer = $q.defer();

    $http.get($rootScope.baseURL+'tableData')
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  return {
    get:get
  };

});