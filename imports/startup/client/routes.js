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

FlowRouter.route('/contact', {
  name: 'contact',
  action() {
    BlazeLayout.render("mainLayout", { content: "Contact" });
  }
});
