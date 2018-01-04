import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from "meteor/kadira:flow-router";
import './navbar.html';

Template.Navbar.events({
  
})

Template.Navbar.helpers({
    'isActive': function (itemName) {
      if (FlowRouter.getRouteName() == itemName) {
          return 'active';
      }
    }

});
