import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

export const Cases = new Mongo.Collection('cases');

if (Meteor.isServer) {
  Meteor.publish('cases', function casesPublication() {
    return Cases.find({ userId: this.userId }, {
      fields: {
        id: 1,
        userId: 1,
        patientAge: 1,
        patientGender: 1,
        painDuration: 1,
        historyIschaemia: 1,
        ecgIschaemia: 1,
        baselineTroponin: 1,
        threeHourTroponin: 1,
        sixHourTroponin: 1,
        finalDiagnosis: 1
      }
    });
  });
}
