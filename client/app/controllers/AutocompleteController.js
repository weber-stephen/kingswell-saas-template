angular.module('app')
.controller('AutocompleteController', function( $scope, $rootScope, $templateCache, SearchFactory) {
    
  var self = this;

  /****************/
  /*   Settings
  /****************/
  var self = this;
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.querySearch = querySearch;
  self.newPage = newPage;
  self.searchTextChange = searchTextChange;
  self.selectedItemChange = selectedItemChange;

  function newPage(state) {
    alert("Creating new page");
  }

  function querySearch(query) {
    return SearchFactory.search(query);
  }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }

  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }

  $scope.getExample = function(_example) {
    return $templateCache.get(_example);
  };

});