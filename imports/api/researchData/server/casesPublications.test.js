/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Factory } from 'meteor/dburles:factory';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { chai, assert, be } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { _ } from 'meteor/underscore';
import { Cases } from '../researchData.js';
import '../researchData.js';

describe('Cases', function () {
  describe('publications', function () {
    let publicList;
    let privateList;
    let userId;
    let newCase;
    let otherCase;
    let otherUserId;
    before(function () {
      userId = Random.id();
      otherUserId = Random.id();

      Factory.define('newCase', Cases, {
        userId,
        patientAge: "31-40",
        patientGender: "female",
        painDuration: "lt2hours",
        historyIschaemia: "false",
        ecgIschaemia: "non-diagnostic",
        baselineTroponin: "4",
        threeHourTroponin: "4",
        sixHourTroponin: null
      });

      newCase = Factory.create('newCase');
      otherCase = Factory.create('newCase', { userId: otherUserId } )
    });
    describe('todos.inList', function () {
      it('sends all a users cases to a user', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect(
          'cases',
          (collections) => {
            chai.assert.equal(collections.cases.length, 1);
            done();
          }
        );
      });
      it('sends no cases when not logged in', function (done) {
        const collector = new PublicationCollector();
        collector.collect(
          'cases',
          (collections) => {
            chai.assert.equal(collections.cases.length, 0);
            done();
          }
        );
      });
      it('sends no cases when logged in as another user', function (done) {
        const collector = new PublicationCollector({ userId: Random.id() });
        collector.collect(
          'cases',
          (collections) => {
            chai.assert.equal(collections.cases.length, 0);
            done();
          }
        );
      });
    });
  });
});
