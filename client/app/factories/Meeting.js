angular.module('app')
.factory('MeetingFactory', function($http,$rootScope,$log,$q){

  function get() {
    var defer = $q.defer();

    $http.get($rootScope.baseURL+'meetings')
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  return {
    get:get
  };

});