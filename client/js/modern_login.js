var Login = (function() {

  function init() {
    initFormSubmit();
  }

  function initFormSubmit() {

    var form = $('#login-form');

    form.submit(function(evt) {
      evt.preventDefault();

      $.ajax({
        url: form.attr('action'),
        method: form.attr('method'),
        data: {
          username:$('#username').val(),
          password:$('#password').val(),
          useAuthToken:$('#useAuthToken').val(),
        },
        crossDomain: true,
        xhrFields: {
            withCredentials: true
         }
      })
      .success(function(data, textStatus, jqXHR) {

        window.location = "/";

      });

    });

  }

  return {
    init:init
  };

})();