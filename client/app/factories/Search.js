angular.module('app')
.factory('SearchFactory', function($http,$rootScope,$log,$q){

	function search(_searchTerm) {
  	$log.debug('SearchFactory - search');

  	var defer = $q.defer();

  	$http.get($rootScope.baseURL+'search/'+_searchTerm)
  	.success(function(response) {
  		defer.resolve(response);
  	});
  	return defer.promise;
  }

  return {
		search:search
	};

});