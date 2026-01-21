toastr.options = {
  closeButton: true,
  progressBar: false,
  positionClass: 'toast-top-right',
  timeOut: '3000',
  extendedTimeOut: '1000',
  showDuration: '300',
  hideDuration: '300',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
};

$('#contact-form1').submit(function (form) {
  form.preventDefault();
  $('#contact-form1 .error').remove();

  $.ajax({
    type: 'POST',
    url: '/contact/',
    headers: {'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()},
    data: $(this).serialize(),

    success: function(data, status, xhr) {
      $('#contact-form1')[0].reset();
      toastr.success('Заявка успешно отправлена!');
    },

    error: function(xhr, exception) {
      $.each(xhr.responseJSON, function (key, value) {
        if (key === 'person_type') {
          let field = $('#contact-form1 .radio-group');
          field.after(`<span class="error">* ${value[0]}</span>`);
        }

        else if (key === 'confirm_privacy') {
          let field = $('#contact-form1 .checkbox-label');
          field.after(`<span class="error">* ${value[0]}</span>`);
        }

        else {
          let field = $('#contact-form1 ' + '#' + key);
          field.after(`<span class="error">* ${value[0]}</span>`);
        }
      });
    }
  });
});

$('#contact-form2').submit(function (form) {
  form.preventDefault();
  $('#contact-form2 .error').remove();

  $.ajax({
    type: 'POST',
    url: '/contact/',
    headers: {'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()},
    data: $(this).serialize(),

    success: function(data, status, xhr) {
      $('#contact-form2')[0].reset();
      toastr.success('Заявка успешно отправлена!');
    },

    error: function(xhr, exception) {
      $.each(xhr.responseJSON, function (key, value) {
        if (key === 'person_type') {
          let field = $('#contact-form2 .radio-group');
          field.after(`<span class="error">* ${value[0]}</span>`);
        }

        else if (key === 'confirm_privacy') {
          let field = $('#contact-form2 .checkbox-label');
          field.after(`<span class="error">* ${value[0]}</span>`);
        }

        else {
          let field = $('#contact-form2 ' + '#' + key);
          field.after(`<span class="error">* ${value[0]}</span>`);
        }
      });
    }
  });
});