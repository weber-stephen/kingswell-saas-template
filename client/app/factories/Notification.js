angular.module('app')
.factory('NotificationFactory', function($http,$rootScope,$log,$q){

  function get() {
    var defer = $q.defer();

    $http.get($rootScope.baseURL+'notifications')
    .success(function(response) {
      var processesResponses = _.groupBy(response, 'type');
      defer.resolve(processesResponses);
    });
    return defer.promise;
  }

  return {
    get:get
  };

});