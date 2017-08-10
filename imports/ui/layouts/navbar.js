import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from "meteor/kadira:flow-router";
import './navbar.html';

Template.Navbar.events({
  'click #logout'(event) {
    event.preventDefault();
    Meteor.logout();

    FlowRouter.go('home');
    }
})

Template.Navbar.helpers({
    'isActive': function (itemName) {
      if (FlowRouter.getRouteName() == itemName) {
          return 'active';
      }
    }

});
