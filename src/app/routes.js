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
      }
  })
  .state('typography', {
      url: '/ui-elements/typography',
      controller:'TypographyController',
      templateUrl: 'views/typography.html',
      data: {
        pageTitle:'Typography'
      }
  })
  .state('buttons', {
      url: '/ui-elements/buttons',
      controller:'ButtonsController',
      templateUrl: 'views/buttons.html',
      data: {
        pageTitle:'Buttons'
      }
  })
  .state('icons-font-awesome', {
      url: '/ui-elements/icons/font-awesome',
      controller:'IconsFontAwesomeController',
      templateUrl: 'views/icons-font-awesome.html',
      data: {
        pageTitle:'Font Awesome Icons'
      }
  })
  .state('icons-material-design', {
      url: '/ui-elements/icons/material-design',
      controller:'IconsMaterialDesignController',
      templateUrl: 'views/icons-material-design.html',
      data: {
        pageTitle:'Material Design Icons'
      }
  })
  .state('cards', {
      url: '/ui-elements/cards',
      controller:'CardsController',
      templateUrl: 'views/cards.html',
      data: {
        pageTitle:'Cards'
      }
  })
  .state('tabs', {
      url: '/ui-elements/tabs',
      controller:'TabsController',
      templateUrl: 'views/tabs.html',
      data: {
        pageTitle:'Tabs'
      }
  })
  .state('notifications', {
      url: '/ui-elements/notifications',
      controller:'NotificationController',
      templateUrl: 'views/notifications.html',
      data: {
        pageTitle:'Notifications'
      }
  })
  .state('modals', {
      url: '/ui-elements/modals',
      controller:'ModalsController',
      templateUrl: 'views/modals.html',
      data: {
        pageTitle:'Modals'
      }
  })
  .state('lists', {
      url: '/ui-elements/lists',
      controller:'ListsController',
      templateUrl: 'views/lists.html',
      data: {
        pageTitle:'Lists'
      }
  })
  .state('basic-forms', {
      url: '/forms/basic-forms',
      controller:'FormsBasicController',
      templateUrl: 'views/basic-forms.html',
      data: {
        pageTitle:'Basic Forms'
      }
  })
  .state('validation', {
      url: '/forms/validation',
      controller:'ValidationController',
      templateUrl: 'views/validation.html',
      data: {
        pageTitle:'Validation'
      }
  })
  .state('autocomplete', {
      url: '/forms/autocomplete',
      controller:'AutocompleteController',
      templateUrl: 'views/autocomplete.html',
      data: {
        pageTitle:'Autocomplete'
      }
  })
  .state('sliders', {
      url: '/forms/sliders',
      controller:'SlidersController',
      templateUrl: 'views/sliders.html',
      data: {
        pageTitle:'Sliders'
      }
  })
  .state('radio-buttons', {
      url: '/forms/radio-buttons',
      controller:'RadioButtonsController',
      templateUrl: 'views/radio-buttons.html',
      data: {
        pageTitle:'Radio Buttons'
      }
  })
  .state('basic-tables', {
      url: '/forms/basic-tables',
      controller:'BasicTablesController',
      templateUrl: 'views/basic-tables.html',
      data: {
        pageTitle:'Basic Tables'
      }
  })
  .state('data-tables', {
      url: '/forms/data-tables',
      controller:'DataTablesController',
      templateUrl: 'views/data-tables.html',
      data: {
        pageTitle:'Data Tables'
      }
  })
  .state('smart-tables', {
      url: '/forms/smart-tables',
      controller:'SmartTablesController',
      templateUrl: 'views/smart-tables.html',
      data: {
        pageTitle:'Smart Tables'
      }
  })
  .state('easy-pie-charts', {
      url: '/charts/easy-pie-charts',
      controller:'EasyPieChartController',
      templateUrl: 'views/easy-pie-charts.html',
      data: {
        pageTitle:'Easy Pie Charts'
      }
  })
  .state('rickshaw', {
      url: '/charts/rickshaw',
      controller:'RickshawController',
      templateUrl: 'views/rickshaw.html',
      data: {
        pageTitle:'Rickshaw'
      }
  });

}]);