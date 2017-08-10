import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './privacyPolicy.html';

Template.PrivacyPolicy.events({

});

Template.PrivacyPolicy.helpers({
  fakeText() {
    var randomCard = faker.helpers.createCard(); // random contact card containing many properties
    return randomCard
  }
})
