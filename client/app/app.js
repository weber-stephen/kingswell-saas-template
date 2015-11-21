angular.module( 'app', [
  'ui.router',
  'ngTouch',
  'ngSanitize',
  'ngAria',
  'ngMaterial',
  'ngAnimate',
  'ngCookies',
  'ngMessages',
  'oc.lazyLoad',
  'btford.socket-io',
  // Enable These If You Are Compiling All Plugins, Modules, Etc. Together
  'uiGmapgoogle-maps',
  // 'smart-table',
  // 'angular-rickshaw',
  // 'easypiechart',
  // 'hljs',
  // 'angular-clipboard',
  // 'picardy.fontawesome',
  // 'md.data.table',
  // 'gridshore.c3js.chart',
  // 'nvd3',
  // 'chartjs',
  'countTo'
])
.config(function(uiGmapGoogleMapApiProvider) {
    
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });

})
.run(function($rootScope) {

  $rootScope.baseURL = 'http://localhost:8080/';

  //This could be an auth check or some other call you need to do on first load
})
.filter('nospace', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
})
.filter('humanizeDoc', function() {
  return function(doc) {
    if (!doc) return;
    if (doc.type === 'directive') {
      return doc.name.replace(/([A-Z])/g, function($1) {
        return '-'+$1.toLowerCase();
      });
    }
    return doc.label || doc.name;
  };
});