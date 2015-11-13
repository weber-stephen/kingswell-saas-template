angular.module('app')
.controller('ButtonsController', function( $scope, $rootScope, $log, $interval) {
    
    //Settings
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.googleUrl = 'http://google.com';

});