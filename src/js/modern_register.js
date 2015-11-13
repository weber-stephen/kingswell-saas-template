var Register = (function() {

  function init() {
    initFormSubmit();
  }

  function initFormSubmit() {

    var form = $('#register-form');

    form.submit(function(evt) {
      evt.preventDefault();

      $.ajax({
        url: form.attr('action'),
        method: form.attr('method'),
        data: form.serialize(),
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