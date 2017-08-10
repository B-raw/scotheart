import { Meteor } from 'meteor/meteor';
import { TestCases } from './testData';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const insertTestCase = new ValidatedMethod({
  name: 'TestCases.methods.insert',
  validate: new SimpleSchema({
    patientGender: {
      type: String,
      optional: true
    },
    painLessThanTwoHoursBoolean: {
      type: Boolean,
      optional: true
    },
    ecgIschaemia: {
      type: String,
      optional: true
    },
    baselineTroponin: {
      type: Number,
      optional: true
    },
    threeHourTroponin: {
      type: Number,
      optional: true
    },
    sixHourTroponin: {
      type: Number,
      optional: true
    },
    route: {
      type: String,
      optional: true
    }
  }).validator(),
  run(newCase) {

  if (this.userId) {
    newCase.userId = this.userId
  }
  newCase.createdAt = new Date()

  TestCases.insert(newCase)
  },
});

// Get list of all method names on TestCases
const CASES_METHODS = _.pluck([
  insertTestCase
], 'name');

if (Meteor.isServer) {
  // Only allow 5 cases operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(CASES_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
