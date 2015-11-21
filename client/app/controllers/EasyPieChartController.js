angular.module('app')
.controller('EasyPieChartController', function( $scope, $rootScope) {

    $scope.pieChart1 = {
        label:'square',
        data:80,
        animate:1000,
        scaleColor: false,
        barColor: function(percent) {
            var ctx = this.renderer.getCtx();
            var canvas = this.renderer.getCanvas();
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0, "#00C9FF");
                gradient.addColorStop(.6, "#92FE9D");
            return gradient;
        },
        lineWidth:8,
        lineCap:'round',
        size:125
    };

    $scope.pieChart2 = {
        label:'square',
        data:40,
        animate:1000,
        scaleColor: false,
        barColor: function(percent) {
            var ctx = this.renderer.getCtx();
            var canvas = this.renderer.getCanvas();
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0, "#7b4397");
                gradient.addColorStop(.6, "#dc2430");
            return gradient;
        },
        lineWidth:8,
        lineCap:'square',
        size:125
    };

    $scope.pieChart3 = {
        label:'butt',
        data:40,
        animate:1000,
        scaleColor: false,
        barColor: function(percent) {
            var ctx = this.renderer.getCtx();
            var canvas = this.renderer.getCanvas();
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0, "#FDFC47");
                gradient.addColorStop(1, "#24FE41");
            return gradient;
        },
        lineWidth:8,
        lineCap:'butt',
        size:125
    };

    $scope.pieChart4 = {
        label:'2',
        data:80,
        animate:1000,
        scaleColor: false,
        barColor: function(percent) {
            var ctx = this.renderer.getCtx();
            var canvas = this.renderer.getCanvas();
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0, "#50C9C3");
                gradient.addColorStop(1, "#96DEDA");
            return gradient;
        },
        lineWidth:2,
        lineCap:'round',
        size:125
    };

    $scope.pieChart5 = {
        label:'5',
        data:80,
        animate:1000,
        scaleColor: false,
        barColor: function(percent) {
            var ctx = this.renderer.getCtx();
            var canvas = this.renderer.getCanvas();
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0, "#AAFFA9");
                gradient.addColorStop(1, "#11FFBD");
            return gradient;
        },
        lineWidth:5,
        lineCap:'round',
        size:125
    };

    $scope.pieChart6 = {
        label:'10',
        data:80,
        animate:1000,
        scaleColor: false,
        barColor: function(percent) {
            var ctx = this.renderer.getCtx();
            var canvas = this.renderer.getCanvas();
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0, "#fe8c00");
                gradient.addColorStop(.5, "#f83600");
            return gradient;
        },
        lineWidth:10,
        lineCap:'round',
        size:125
    };

    $scope.pieChart7 = {
        label:'50 Size',
        data:80,
        animate:1000,
        scaleColor: false,
        barColor: function(percent) {
            var ctx = this.renderer.getCtx();
            var canvas = this.renderer.getCanvas();
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0, "#24C6DC");
                gradient.addColorStop(1, "#514A9D");
            return gradient;
        },
        lineWidth:2,
        lineCap:'round',
        size:50
    };

    $scope.pieChart8 = {
        label:'100 Size',
        data:80,
        animate:1000,
        scaleColor: false,
        barColor: function(percent) {
            var ctx = this.renderer.getCtx();
            var canvas = this.renderer.getCanvas();
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0, "#4776E6");
                gradient.addColorStop(.5, "#8E54E9");
            return gradient;
        },
        lineWidth:5,
        lineCap:'round',
        size:100
    };

    $scope.pieChart9 = {
        label:'200 Size',
        data:80,
        animate:1000,
        scaleColor: false,
        barColor: function(percent) {
            var ctx = this.renderer.getCtx();
            var canvas = this.renderer.getCanvas();
            var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0, "#F09819");
                gradient.addColorStop(.7, "#EDDE5D");
            return gradient;
        },
        lineWidth:10,
        lineCap:'round',
        size:200
    };

});