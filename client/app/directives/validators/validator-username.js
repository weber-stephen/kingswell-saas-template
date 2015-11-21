angular.module('app')
.directive('usernameValidator', ['UserFactory', function(UserFactory) {
  return {
    require: 'ngModel',
    link : function(scope, element, attrs, ngModel) {

      loading(true);

      // add a parser that will process each time the value is parsed into the model when the user updates it.
      ngModel.$parsers.unshift(function(value) {
        UserFactory.usernameCheck(value)
        .then(function(data) {
          console.log(data);
          if(data.response === 'available') {
            valid(false);
          } else {
            valid(true);
          }
          loading(false);
        });
      });

      function valid(bool) {
        ngModel.$setValidity('username-taken', bool);
      }

      function loading(bool) {
        ngModel.$setValidity('loading', !bool);
      }
    }
  }
}])