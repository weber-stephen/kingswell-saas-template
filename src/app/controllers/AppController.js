angular.module('app')
.controller( 'AppController', function( $scope, $rootScope, $mdSidenav, $state, $log, $timeout, $mdTheming, $mdComponentRegistry, menu, TaskFactory, CustomerFactory, MeetingFactory, UserFactory, SearchFactory, MessageFactory, socketServer, EVENTS ) {
  
  $scope.themes = ThemeService().themes;
  $scope.allThemeCombinations = ThemeService().all_combinations;
  $scope.theme = 'default';

  $scope.currentUser = undefined;

  $scope.messageCount = 2;
  $scope.notificationCount = 1;
  $scope.listCount = 4;

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      $scope.pageTitle = toState.data.pageTitle;
  });

  $mdComponentRegistry
  .when('left')
  .then( function(sideNav){

    $scope.isOpen = angular.bind(sideNav, sideNav.isOpen );
    $scope.toggle = angular.bind(sideNav, sideNav.toggle );

  });

  $scope.menu = menu;

  // Methods used by menuLink and menuToggle directives
  this.isOpen = isOpen;
  this.isSelected = isSelected;
  this.toggleOpen = toggleOpen;
  this.autoFocusContent = false;

  $scope.init = function() {
    $scope.getUserInfo();
    $scope.getMessages();
    $scope.getTasks();
    $scope.getMeetings();
    $scope.getCustomers();
  };

  $scope.openMessageMenu = function($mdOpenMenu, ev) {
    console.log('openMessageMenu');
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.getMeetings = function() {
      MeetingFactory.get()
      .then(function(data) {
          $scope.meetings = data;
          $scope.meetingsToday = _.filter($scope.meetings, { 'timestamp': "Today" }).length;
      });
  };

  $scope.getTasks = function() {
      TaskFactory.get()
      .then(function(data) {
          $scope.tasks = data;
          $scope.tasksDueToday = _.filter($scope.tasks, { 'timestamp': "Today" }).length;
      });
  };

  $scope.getMessages = function() {
    MessageFactory.get()
    .then(function(data) {
      $scope.messages = data;
      $scope.unreadMessages = _.filter($scope.messages, { 'unread': true }).length;
    });
  };

  $scope.getCustomers = function() {
    CustomerFactory.get()
    .then(function(data) {
      $scope.customers = data;
      $scope.unreadMessages = _.filter($scope.messages, { 'unread': true }).length;
    });
  };

  $scope.getUserInfo = function() {
    UserFactory.getUserInfo()
    .then(function(data) {
      $scope.currentUser = data;
    });
  };

  $scope.openMessagesSidebar = function() {
    //This sends an event to the scope's children, in this case the UserSidebarController
    $scope.$broadcast(EVENTS.SIDEBAR_RIGHT_TAB_MESSAGE_SELECT);
    $scope.toggleSidenav('right');
  };

  $scope.openNotificationsSidebar = function() {
    //This sends an event to the scope's children, in this case the UserSidebarController
    $scope.$broadcast(EVENTS.SIDEBAR_RIGHT_TAB_NOTIFICATION_SELECT);
    $scope.toggleSidenav('right');
  };

  $scope.openTasksSidebar = function() {
    //This sends an event to the scope's children, in this case the UserSidebarController
    $scope.$broadcast(EVENTS.SIDEBAR_RIGHT_TAB_TASK_SELECT);
    $scope.toggleSidenav('right');
  };

  $scope.toggleSidenav = function(menuId) {
  	$mdSidenav(menuId).toggle();
	};

  $scope.openMenu = function($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  $scope.handleChangeTheme = function(theme) {
    $scope.theme = theme.label;
  };

  $scope.handleEditUser = function() {

  };

  $scope.handleLogout = function() {
    
  };

  $scope.querySearch = function(query) {
    return SearchFactory.search(query);
  };

  $scope.searchTextChange = function(text) {
    $log.info('Text changed to ' + text);
  };

  $scope.selectedPageChange = function(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
    if(_.has(item,'id')) {
      $state.go(item.id);
    }
  };
  // *********************
  // Internal methods
  // *********************
  // function buildToggler(navID) {
  //   return function() {
  //     $mdSidenav(navID)
  //       .toggle()
  //       .then(function () {
  //         $log.debug("toggle " + navID + " is done");
  //       });
  //   };
  // }

  function closeMenu() {
    $timeout(function() { $mdSidenav('left').close(); });
  }

  function openMenu() {
    $timeout(function() { $mdSidenav('left').open(); });
  }

  function path() {
    return $location.path();
  }

  function goHome($event) {
    // menu.selectPage(null, null);
    $location.path( '/' );
  }

  function openPage() {
    $scope.closeMenu();

    if (self.autoFocusContent) {
      focusMainContent();
      self.autoFocusContent = false;
    }
  }

  function focusMainContent($event) {
    // prevent skip link from redirecting
    if ($event) { $event.preventDefault(); }

    $timeout(function(){
      mainContentArea.focus();
    },90);

  }

  function isSelected(page) {
    return menu.isPageSelected(page);
  }

  function isSectionSelected(section) {
    var selected = false;
    var openedSection = menu.openedSection;
    if(openedSection === section){
      selected = true;
    }
    else if(section.children) {
      section.children.forEach(function(childSection) {
        if(childSection === openedSection){
          selected = true;
        }
      });
    }
    return selected;
  }

  function isOpen(section) {
    return menu.isSectionSelected(section);
  }

  function toggleOpen(section) {
    menu.toggleSelectSection(section);
  }

	$rootScope.mapStyles = {
		lightgrey:[{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
	};

  /* Socket Handling */
  $scope.$on(EVENTS.MESSAGE_INCOMING, function(event, data) {
    $scope.messageCount++;
  });

	$scope.init();

});

