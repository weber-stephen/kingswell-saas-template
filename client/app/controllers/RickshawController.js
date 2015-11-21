angular.module('app')
.controller('RickshawController', function( $scope) {

    //Area Chart Settings
    $scope.areaChartOptions = {
        renderer: 'area'
    };
    $scope.areaChartFeatures = {
        hover: {
            xFormatter: function(x) {
                return 't=' + x;
            },
            yFormatter: function(y) {
                return '$' + y;
            }
        }
    };
    $scope.areaChartSeries = [{
        name: 'Series 1',
        color: 'steelblue',
        data: [{x: 0, y: 23}, {x: 1, y: 15}, {x: 2, y: 79}, {x: 3, y: 31}, {x: 4, y: 60}]
    }, {
        name: 'Series 2',
        color: 'lightblue',
        data: [{x: 0, y: 30}, {x: 1, y: 20}, {x: 2, y: 64}, {x: 3, y: 50}, {x: 4, y: 15}]
    }];

    //Line Chart Settings
    $scope.lineChartOptions = {
        renderer: 'line'
    };
    $scope.lineChartFeatures = {
        hover: {
            xFormatter: function(x) {
                return 't=' + x;
            },
            yFormatter: function(y) {
                return '$' + y;
            }
        }
    };
    $scope.lineChartSeries = [{
        name: 'Series 1',
        color: 'steelblue',
        data: [{x: 0, y: 23}, {x: 1, y: 15}, {x: 2, y: 79}, {x: 3, y: 31}, {x: 4, y: 60}]
    }, {
        name: 'Series 2',
        color: 'lightblue',
        data: [{x: 0, y: 30}, {x: 1, y: 20}, {x: 2, y: 64}, {x: 3, y: 50}, {x: 4, y: 15}]
    }];

});