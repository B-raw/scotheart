import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './countrySelect.js';
import './signup.html';

Template.Signup.onCreated(function() {
  this.showPassword = new ReactiveVar(false);
});

Template.Signup.onRendered(() => {
  $('#country').countrySelect({
    preferredCountries: ['gb', 'us'],
  });

  $('#signup-form').validate();
});

Template.Signup.helpers({
  showPassword() {
    if (Template.instance().showPassword.get()) {
      return "text";
    } else {
      return "password";
    }
  },
  showNonSlashEye() {
    return Template.instance().showPassword.get();
  }
})

Template.Signup.events({
  'submit form': function (event) {
    event.preventDefault();
    const target = event.target;

    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const country = target.country.value;
    const organisation = target.organisation.value;
    const specialty = target.specialty.value;
    const role = target.role.value;
    const email = target.email.value;
    const password = target.password.value;
    const tsAndCs = target.tsAndCs.checked;

    const options = {
      email,
      password,
      about: { firstName,
        lastName,
        country,
        organisation,
        specialty,
        role,
      },
    };

    createNewUser(options);
  },
  'click #showPassword'(event, template) {
    event.preventDefault();
    template.showPassword.set(!template.showPassword.get());
  }
});

function createNewUser(options) {
  Accounts.createUser(options, (err) => {
    if (err) {
      console.log(err.reason);
      $('div#errors').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>')
                     .html(err.reason)
                     .addClass('alert alert-danger')
                     .attr('role', 'alert');
    } else {
      FlowRouter.go('home');
    }
  });
}
