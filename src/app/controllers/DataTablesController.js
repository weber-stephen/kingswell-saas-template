angular.module('app')
.controller('DataTablesController', function( $scope, $templateCache, $q, GithubFactory) {
    
    //Settings
    $scope.selected = [];

    $scope.query = {
      filter: '',
      order: 'asc',
      per_page: 5,
      page: 1
    };

    $scope.getTableData = function() {
      GithubFactory.getUsers()
      .then(function(data) {
        $scope.github = data;
      });
    };

    $scope.search = function (predicate) {
      $scope.filter = predicate;
      $scope.deferred = GithubFactory.getUsers($scope.query);
    };

    $scope.onOrderChange = function (order) {
      console.log(order);

      var defer = $q.defer();

      GithubFactory.getUsers($scope.query)
      .then(function(data) {
        $scope.github = data;
        defer.resolve(data);
      });
      return defer.promise;
    };

    $scope.onPaginationChange = function (page, per_page) {
      console.log(page);
      console.log(per_page);

      var defer = $q.defer();

      GithubFactory.getUsers($scope.query)
      .then(function(data) {
        $scope.github = data;
        defer.resolve(data);
      }); 
      return defer.promise;
    };


    $scope.getExample = function(_example) {
      return $templateCache.get(_example);
    };

    $scope.getTableData();

});