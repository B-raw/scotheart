import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './login.html';
import '../helpers/validationHelper.js';

Template.Login.onCreated(function() {
  this.showPassword = new ReactiveVar(false);
});

Template.Login.onRendered(() => {
  $('#login-form').validate();
});

Template.Login.events({
  'submit form': function (event) {
    event.preventDefault();
    const target = event.target;

    const email = target.email.value;
    const password = target.password.value;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        $('div#errors').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>')
                       .html(error.reason)
                       .addClass('alert alert-danger')
                       .attr('role', 'alert');
      } else {
        FlowRouter.go('home');
      }
    });
  },
  'click #showPassword'(event, template) {
    event.preventDefault();
    template.showPassword.set(!template.showPassword.get());
  }
});

Template.Login.helpers({
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
