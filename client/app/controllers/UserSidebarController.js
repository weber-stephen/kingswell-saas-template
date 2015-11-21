angular.module('app')
.controller('UserSidebarController', function($scope, $timeout, $mdSidenav, $log, EVENTS, MessageFactory, NotificationFactory) {

    //Settings
    $scope.messages = [];
    $scope.notifications = [];
    
    $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '',
      company: 'Google',
      address: '1600 Amphitheatre Pkwy',
      city: 'Mountain View',
      state: 'CA',
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode: '94043',
      gender:'Male'
    };

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
    });

    $scope.selectedSidebarTab = 0;

    // These events are to be picked up from the App Controller
    $scope.$on(EVENTS.SIDEBAR_RIGHT_TAB_MESSAGE_SELECT,function() {
      $scope.selectedSidebarTab = 0;
    });

    $scope.$on(EVENTS.SIDEBAR_RIGHT_TAB_NOTIFICATION_SELECT,function() {
      $scope.selectedSidebarTab = 1;
    });

    $scope.$on(EVENTS.SIDEBAR_RIGHT_TAB_TASK_SELECT,function() {
      $scope.selectedSidebarTab = 2;
    });

    var originatorEv;

    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          
        });
    };

    $scope.openMessageMenu = function($mdOpenMenu, ev) {
      console.log('openMessageMenu');
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.getNotifications = function() {

      NotificationFactory.get()
      .then(function(data) {
        // console.log(data);
        $scope.notifications = data;
      });

    };

    $scope.getMessages = function() {

      MessageFactory.get()
      .then(function(data) {
        $scope.messages = data;
      });

    };

    $scope.handleMessageClick = function(message) {
      $log.debug(message);
    };

    $scope.getExample = function(_example) {
      return $templateCache.get(_example);
    };

    $scope.getMessages();
    $scope.getNotifications();

});