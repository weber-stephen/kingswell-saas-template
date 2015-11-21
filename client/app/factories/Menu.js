angular.module('app')
.factory('menu', [
  '$location',
  '$rootScope',
  '$http',
  '$window',
function($location, $rootScope, $http, $window) {
  
  var sections = [{
    name: 'Dashboard',
    url: 'dashboard',
    type: 'link'
  },{
    name: 'UI Elements',
    type: 'toggle',
    pages: [{
      name: 'Typography',
      url: 'typography',
      type: 'link'
    },
    {
      name : 'Buttons',
      url: 'buttons',
      type: 'link'
    },
    {
      name : 'Font Awesome Icons',
      url: 'icons-font-awesome',
      type: 'link'
    },
    {
      name : 'Material Design Icons',
      url: 'icons-material-design',
      type: 'link'
    },
    {
      name : 'Cards',
      url: 'cards',
      type: 'link'
    },
    {
      name : 'Tabs',
      url: 'tabs',
      type: 'link'
    },
    {
      name : 'Notifications',
      url: 'notifications',
      type: 'link'
    },
    {
      name : 'Modals',
      url: 'modals',
      type: 'link'
    },
    {
      name : 'Lists',
      url: 'lists',
      type: 'link'
    }]
  },{
    name: 'Forms',
    type: 'toggle',
    pages: [{
      name: 'Basic Forms',
      url: 'basic-forms',
      type: 'link'
    },
    {
      name : 'Validation',
      url: 'validation',
      type: 'link'
    },
    {
      name : 'Autocomplete',
      url: 'autocomplete',
      type: 'link'
    },
    {
      name : 'Sliders',
      url: 'sliders',
      type: 'link'
    },
    {
      name : 'Radio Buttons',
      url: 'radio-buttons',
      type: 'link'
    }]
  },{
    name: 'Tables',
    type: 'toggle',
    pages: [{
      name: 'Basic Tables',
      url: 'basic-tables',
      type: 'link'
    },
    {
      name : 'Data Tables',
      url: 'data-tables',
      type: 'link'
    }]
  },{
    name: 'Charts',
    type: 'toggle',
    pages: [{
      name: 'Easy Pie Charts',
      url: 'easy-pie-charts',
      type: 'link'
    },
    {
      name : 'Rickshaw',
      url: 'rickshaw',
      type: 'link'
    }]
  },{
    name: 'Pages',
    type: 'toggle',
    pages: [{
      name: 'Basic Login',
      absolute_url: 'basic_login.html',
      type: 'link'
    },{
      name: 'Modern Login',
      absolute_url: 'modern_login.html',
      type: 'link'
    },{
      name: 'Basic Register',
      absolute_url: 'basic_register.html',
      type: 'link'
    },{
      name: 'Modern Register',
      absolute_url: 'modern_register.html',
      type: 'link'
    }]
  }];

  function sortByName(a,b) {
    return a.name < b.name ? -1 : 1;
  }

  var self;

  $rootScope.$on('$locationChangeSuccess', onLocationChange);

  return self = {
    sections: sections,

    selectSection: function(section) {
      self.openedSection = section;
    },
    toggleSelectSection: function(section) {
      self.openedSection = (self.openedSection === section ? null : section);
    },
    isSectionSelected: function(section) {
      return self.openedSection === section;
    },

    selectPage: function(section, page) {
      self.currentSection = section;
      self.currentPage = page;
    },
    isPageSelected: function(page) {
      return self.currentPage === page;
    }
  };

  function onLocationChange() {
    var path = $location.path();
    var introLink = {
      name: "Introduction",
      url:  "/",
      type: "link"
    };

    if (path == '/') {
      self.selectSection(introLink);
      self.selectPage(introLink, introLink);
      return;
    }

    var matchPage = function(section, page) {
      if (path.indexOf(page.url) !== -1) {
        self.selectSection(section);
        self.selectPage(section, page);
      }
    };

    sections.forEach(function(section) {
      if (section.children) {
        // matches nested section toggles, such as API or Customization
        section.children.forEach(function(childSection){
          if(childSection.pages){
            childSection.pages.forEach(function(page){
              matchPage(childSection, page);
            });
          }
        });
      }
      else if (section.pages) {
        // matches top-level section toggles, such as Demos
        section.pages.forEach(function(page) {
          matchPage(section, page);
        });
      }
      else if (section.type === 'link') {
        // matches top-level links, such as "Getting Started"
        matchPage(section, section);
      }
    });
  }
}]);