troponinRequirements = {
  required: true,
  digits: true,
  min: 0,
  max: 50000,
}

$.validator.setDefaults({
  errorElement: "span",
  errorClass: "help-block",
  highlight: function(element) {
      $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
  },
  unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
  },
  errorPlacement: function (error, element) {
    if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
      error.insertAfter(element.parent().parent());
    } else if (element.parent().parent('.signup-panel').length) {
      error.insertAfter(element);
    }
    else {
      error.insertAfter(element.parent());
    }
  },
  rules: {
    baselineTroponin: troponinRequirements,
    threeHourTroponin: troponinRequirements,
    sixHourTroponin: troponinRequirements,
    gender: {
      required: true,
    },
    painDuration: {
      required: true,
    },
    patientAge: {
      required: true,
    },
    ecgIschaemia: {
      required: true,
    },
    country: {
      required: true,
    },
    organisation: {
      required: true,
    },
    role: {
      required: true,
    },
    specialty: {
      required: true,
    },
    tsAndCs: {
      required: true,
    },
    email: {
      required: true,
    },
    password: {
      minlength: 6,
    }
  },
  messages: {
    baselineTroponin: {
      required: "Please enter a baseline troponin",
      // bookUnique: "This book already exists!"
    },
    password: {
      minlength: "Use at least 6 characters, please.",
    },
    gender: {
      required: "Please enter the patient's gender"
    },
  },
});
