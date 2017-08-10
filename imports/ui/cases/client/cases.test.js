import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { ReactiveVar } from 'meteor/reactive-var';
import '../../test_helpers.js'
import '../cases.js'

describe('Cases', function() {
  before(function() {
    resetDatabase();

    Template.Cases.onCreated(function() {
      this.editModeCases = new ReactiveVar(false);
      // console.log(this.editModeCases)
    });
  });

  // it('click Edit it can delete entries', function () {
  //   let data = {
  //     editModeCases: () => true,
  //     cases: () => {
  //       patientAge: "18-30"
  //     }
  //   };
  //
  //   withRenderedTemplate('Cases', data, el => {
  //     expect($(el).context.innerText).to.include("Exit Edit Mode")
  //     // expect($(el).context.innerText).to.include("Edit")
  //     // expect($(el).context.innerHTML).to.include("Delete")
  //   });
  // });
  //
  // it('not click edit can\'t delete entries', function () {
  //   let data = {
  //     // editModeCases: () => false,
  //   };
  //
  //   withRenderedTemplate('Cases', data, el => {
  //     Template.Cases.onCreated(function() {
  //       this.editModeCases = new ReactiveVar(false);
  //     });
  //     expect($(el).context.innerText).to.include("Edit My Cases")
  //     // expect($(el).context.innerText).to.not.include("Edit")
  //     // expect($(el).context.innerHTML).to.not.include("Delete")
  //   });
  // });
});
