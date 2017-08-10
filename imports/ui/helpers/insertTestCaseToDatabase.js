import { insertTestCase } from '../../api/testData/methods.js';
import { FlowRouter } from "meteor/kadira:flow-router";

export const insertTestCaseToDatabase = function() {
  newCase = {
    patientGender: Session.get('patientGender'),
    painLessThanTwoHoursBoolean: Session.get('painDurationBoolean'),
    baselineTroponin: Session.get('baselineTroponin'),
    threeHourTroponin: Session.get('threeHourTroponin'),
    sixHourTroponin: Session.get('sixHourTroponin'),
    route: FlowRouter.getRouteName()
  };

  insertTestCase.call(newCase, (error) => {
    if (error) {
      console.log(error);
    } else {
      //success!!
    }
  });
}
