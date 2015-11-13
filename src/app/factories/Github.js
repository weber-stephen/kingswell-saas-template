angular.module('app')
.factory('GithubFactory', function($http,$rootScope,$log,$q){

  function getUsers(_options) {

    var defer = $q.defer();

    var options = angular.extend({
      filter:'',
      per_page:5,
      page:1,
      order:'-id'
    }, _options);
    
    var order = 'asc';
    if(_.has(options,'order')) {
      if(options.order === 'id') {
        order = 'desc';
      } else {
        order = 'asc';
      }
    }

    $http.get('https://api.github.com/search/users?q='+options.filter+'+repos:%3E10+followers:%3E100&order='+order+'&sort=joined&per_page='+options.per_page+'&page='+options.page)
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  return {
    getUsers:getUsers
  };

});