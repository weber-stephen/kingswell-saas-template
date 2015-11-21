angular.module('app')
.config(function($mdThemingProvider) {

  var themes = ThemeService().themes;

  for (var i = 0; i < themes.length; ++i) {
      
    $mdThemingProvider.theme(themes[i].label)
    .primaryPalette(themes[i].primary.label)
    .accentPalette(themes[i].accent.label);

    // console.log('Registering Theme: '+themes[i].label);
    
  }

  // If you need this behavior in your entire application (ie. on all md-theme directives) you can use the $mdThemingProvider to enable it.
  $mdThemingProvider.alwaysWatchTheme(true);

});