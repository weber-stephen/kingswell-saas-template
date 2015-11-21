angular.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ( $stateProvider, $urlRouterProvider, $locationProvider ) {
  
  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('dashboard', {
      url: '/',
      controller:'DashboardController',
      templateUrl: 'views/dashboard.html',
      data: {
        pageTitle:'Dashboard'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                      //Moment for time display
                      'bower_components/moment/min/moment.min.js',

                      // Sales Chart - NVD3 Charts
                      'bower_components/nvd3/build/nv.d3.js',
                      'bower_components/nvd3/build/nv.d3.css',
                      'bower_components/angular-nvd3/dist/angular-nvd3.js',

                      // Server Chart - ChartJS
                      'bower_components/ng-chartjs/dist/angular-chartjs.min.js',
                      'bower_components/Chart.js/Chart.min.js',

                      //Easy Pie Chart
                      'bower_components/jquery.easy-pie-chart/dist/angular.easypiechart.min.js',
                      'bower_components/jquery.easy-pie-chart/dist/easypiechart.min.js',
                      'bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',

                      // Count To
                      'bower_components/angular-count-to/build/angular-count-to.min.js',

                      'js/controllers/DashboardController.js'
                  ] 
              });
          }]
      }
  })
  .state('typography', {
      url: '/ui-elements/typography',
      controller:'TypographyController',
      templateUrl: 'views/typography.html',
      data: {
        pageTitle:'Typography'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/TypographyController.js'
                  ] 
              });
          }]
      }
  })
  .state('buttons', {
      url: '/ui-elements/buttons',
      controller:'ButtonsController',
      templateUrl: 'views/buttons.html',
      data: {
        pageTitle:'Buttons'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/ButtonsController.js'
                  ] 
              });
          }]
      }
  })
  .state('icons-font-awesome', {
      url: '/ui-elements/icons/font-awesome',
      controller:'IconsFontAwesomeController',
      templateUrl: 'views/icons-font-awesome.html',
      data: {
        pageTitle:'Font Awesome Icons'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/IconsFontAwesomeController.js'
                  ] 
              });
          }]
      }
  })
  .state('icons-material-design', {
      url: '/ui-elements/icons/material-design',
      controller:'IconsMaterialDesignController',
      templateUrl: 'views/icons-material-design.html',
      data: {
        pageTitle:'Material Design Icons'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/IconsMaterialDesignController.js'
                  ] 
              });
          }]
      }
  })
  .state('cards', {
      url: '/ui-elements/cards',
      controller:'CardsController',
      templateUrl: 'views/cards.html',
      data: {
        pageTitle:'Cards'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/CardsController.js'
                  ] 
              });
          }]
      }
  })
  .state('tabs', {
      url: '/ui-elements/tabs',
      controller:'TabsController',
      templateUrl: 'views/tabs.html',
      data: {
        pageTitle:'Tabs'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/TabsController.js'
                  ] 
              });
          }]
      }
  })
  .state('notifications', {
      url: '/ui-elements/notifications',
      controller:'NotificationController',
      templateUrl: 'views/notifications.html',
      data: {
        pageTitle:'Notifications'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/NotificationController.js'
                  ] 
              });
          }]
      }
  })
  .state('modals', {
      url: '/ui-elements/modals',
      controller:'ModalsController',
      templateUrl: 'views/modals.html',
      data: {
        pageTitle:'Modals'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/ModalsController.js'
                  ] 
              });
          }]
      }
  })
  .state('lists', {
      url: '/ui-elements/lists',
      controller:'ListsController',
      templateUrl: 'views/lists.html',
      data: {
        pageTitle:'Lists'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/ListsController.js'
                  ] 
              });
          }]
      }
  })
  .state('basic-forms', {
      url: '/forms/basic-forms',
      controller:'FormsBasicController',
      templateUrl: 'views/basic-forms.html',
      data: {
        pageTitle:'Basic Forms'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/FormsBasicController.js'
                  ] 
              });
          }]
      }
  })
  .state('validation', {
      url: '/forms/validation',
      controller:'ValidationController',
      templateUrl: 'views/validation.html',
      data: {
        pageTitle:'Validation'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                      // ngMessages for Validation
                      'bower_components/angular-messages/angular-messages.min.js',

                      'js/controllers/ValidationController.js'
                  ] 
              });
          }]
      }
  })
  .state('autocomplete', {
      url: '/forms/autocomplete',
      controller:'AutocompleteController',
      templateUrl: 'views/autocomplete.html',
      data: {
        pageTitle:'Autocomplete'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/AutocompleteController.js'
                  ] 
              });
          }]
      }
  })
  .state('sliders', {
      url: '/forms/sliders',
      controller:'SlidersController',
      templateUrl: 'views/sliders.html',
      data: {
        pageTitle:'Sliders'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/SlidersController.js'
                  ] 
              });
          }]
      }
  })
  .state('radio-buttons', {
      url: '/forms/radio-buttons',
      controller:'RadioButtonsController',
      templateUrl: 'views/radio-buttons.html',
      data: {
        pageTitle:'Radio Buttons'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/RadioButtonsController.js'
                  ] 
              });
          }]
      }
  })
  .state('basic-tables', {
      url: '/forms/basic-tables',
      controller:'BasicTablesController',
      templateUrl: 'views/basic-tables.html',
      data: {
        pageTitle:'Basic Tables'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'js/controllers/BasicTablesController.js'
                  ] 
              });
          }]
      }
  })
  .state('data-tables', {
      url: '/forms/data-tables',
      controller:'DataTablesController',
      templateUrl: 'views/data-tables.html',
      data: {
        pageTitle:'Data Tables'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'bower_components/angular-material-data-table/dist/md-data-table.min.js',
                    'bower_components/angular-material-data-table/dist/md-data-table.min.css',

                    'js/controllers/DataTablesController.js'
                  ] 
              });
          }]
      }
  })
  .state('easy-pie-charts', {
      url: '/charts/easy-pie-charts',
      controller:'EasyPieChartController',
      templateUrl: 'views/easy-pie-charts.html',
      data: {
        pageTitle:'Easy Pie Charts'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'bower_components/jquery.easy-pie-chart/dist/angular.easypiechart.min.js',

                    'js/controllers/EasyPieChartController.js'
                  ] 
              });
          }]
      }
  })
  .state('rickshaw', {
      url: '/charts/rickshaw',
      controller:'RickshawController',
      templateUrl: 'views/rickshaw.html',
      data: {
        pageTitle:'Rickshaw'
      },
      resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'app',
                  files: [
                    'bower_components/rickshaw/rickshaw.min.js',
                    'bower_components/rickshaw/rickshaw.min.css',
                    'bower_components/angular-rickshaw/rickshaw.js',

                    'js/controllers/RickshawController.js'
                  ] 
              });
          }]
      }
  });

}]);