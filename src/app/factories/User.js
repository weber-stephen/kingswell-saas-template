angular.module('app')
.factory('UserFactory', function($http,$rootScope,$log,$q){

	function login(username,password) {
  	$log.debug('User - login');
  	$log.debug({'username':username,'password':password});

  	var defer = $q.defer();

  	$http.post($rootScope.baseURL+'/login',
		{
			username:username,
			password:password
		})
  	.success(function(response) {
  		defer.resolve(response);
  	});
  	return defer.promise;
  }

  function getUserInfo() {
    var defer = $q.defer();
    $http.get($rootScope.baseURL+'currentUser')
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  function usernameCheck(username) {
    var defer = $q.defer();

    $http.get($rootScope.baseURL+'usernameCheck/'+username)
    .success(function(response) {
      defer.resolve(response);
    });
    return defer.promise;
  }

  return {
		login:login,
    getUserInfo:getUserInfo,
    usernameCheck:usernameCheck
	};

});