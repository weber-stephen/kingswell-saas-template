angular.module('app')
.controller('RadioButtonsController', function( $scope, $rootScope, $templateCache) {
  
  // Settings
  $scope.data = {
    group1 : 'Banana',
    group2 : '2',
    group3 : 'avatar-1'
  };
  $scope.avatarData = [{
      img: "profile2",
      title: 'avatar 1',
      value: 'avatar-1'
    },{
      img: "profile3",
      title: 'avatar 2',
      value: 'avatar-2'
    },{
      img: "profile4",
      title: 'avatar 3',
      value: 'avatar-3'
  }];

  $scope.radioData = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: '3', isDisabled: true },
    { label: '4', value: '4' }
  ];
  
  $scope.addItem = function() {
    var r = Math.ceil(Math.random() * 1000);
    $scope.radioData.push({ label: r, value: r });
  };

  $scope.removeItem = function() {
    $scope.radioData.pop();
  };

  $scope.getExample = function(_example) {
    return $templateCache.get(_example);
  };

});