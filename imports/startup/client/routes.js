import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import { clearAllSessions } from "./helpers/clearSessionHelper"

// IMPORTING VIEWS (JS FILES)
import '../../ui/layouts/mainLayout.js';

FlowRouter.route('/', {
  name: 'calculator',
  action() {
    BlazeLayout.render("mainLayout", { content: "Calculator" });
  }
});

FlowRouter.route('/about', {
  name: 'about',
  action() {
    BlazeLayout.render("mainLayout", { content: "About" });
  }
});

FlowRouter.route('/signup', {
  name: 'signup',
  action() {
    if(Meteor.userId()) {
      FlowRouter.go('home');
    }
    BlazeLayout.render("mainLayout", { content: "Signup" });
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    if(Meteor.userId()) {
      FlowRouter.go('home');
    }
    BlazeLayout.render("mainLayout", { content: "Login" });
  }
});

FlowRouter.route('/terms-conditions', {
  name: 'terms-conditions',
  action() {
    BlazeLayout.render("mainLayout", { content: "TermsConditions" });
  }
});

FlowRouter.route('/privacy-policy', {
  name: 'privacy-policy',
  action() {
    BlazeLayout.render("mainLayout", { content: "PrivacyPolicy" });
  }
});

FlowRouter.route('/pathway', {
  name: 'pathway',
  action() {
    BlazeLayout.render("mainLayout", { content: "Pathway" });
  }
});

FlowRouter.route('/funding', {
  name: 'funding',
  action() {
    BlazeLayout.render("mainLayout", { content: "Funding" });
  }
});

FlowRouter.route('/definition', {
  name: 'definition',
  action() {
    BlazeLayout.render("mainLayout", { content: "Definition" });
  }
});

FlowRouter.route('/contact', {
  name: 'contact',
  action() {
    BlazeLayout.render("mainLayout", { content: "Contact" });
  }
});
