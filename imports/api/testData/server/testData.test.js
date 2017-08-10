import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
// import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { chai, assert, expect, be } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { _ } from 'meteor/underscore';
import { DDP } from 'meteor/ddp-client';
import { TestCases } from '../testData.js';
import { insertTestCase, editTestCase, deleteTestCase } from '../methods.js';
// import './publications.js';

describe('TestCases', function () {
  describe('methods', function() {
    let userId, newCase, user;

    beforeEach(function() {
      //clear database
      resetDatabase();

      Factory.define('user', Meteor.users, {
        email: 'bill@bill.com',
        password: "123321",
      });

      user = Factory.create('user');

      newCase = {
        patientGender: "female",
        painLessThanTwoHoursBoolean: true,
        ecgIschaemia: "non-diagnostic",
        baselineTroponin: 4,
        threeHourTroponin: 4,
        sixHourTroponin: null
      }

      userId = user._id;
    });

    it('insertTestCase inserts a case into database', function() {
      const methodInvocation = { userId };
      const args = { newCase };
      insertTestCase._execute(methodInvocation, newCase);

      let myCase = TestCases.findOne()

      expect(TestCases.find().count()).to.equal(1)
      expect(myCase.userId).to.equal(userId)
      expect(myCase.patientAge).to.equal(newCase.patientAge)
    });
  });

  // unable to get this to work, as it says I am not logged in...
  // describe('rate limiting', function () {
  //   let userId;
  //
  //   it('does not allow more than 5 operations rapidly', function () {
  //     const methodInvocation = { userId };
  //
  //     const connection = DDP.connect(Meteor.absoluteUrl());
  //     _.times(5, () => {
  //       connection.call(insertCase.name, {
  //         methodInvocation,
  //         patientAge: "rick",
  //         patientGender: "male",
  //         painDuration: "3",
  //         historyIschaemia: "true",
  //         ecgIschaemia: "true"
  //       });
  //     });
  //     assert.throws(() => {
  //       connection.call(insertCase.name , {
  //         patientAge: "rick",
  //         patientGender: "male",
  //         painDuration: "3",
  //         historyIschaemia: "true",
  //         ecgIschaemia: "true"
  //       });
  //     }, Meteor.Error, /too-many-requests/);
  //     connection.disconnect();
  //   });
  // });
});
