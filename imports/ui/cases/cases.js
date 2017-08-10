import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Cases } from '../../api/researchData/researchData.js';
import { MomentsJS } from 'meteor/momentjs:moment';
import { deleteCase, editCase } from '../../api/researchData/methods.js';
import './cases.html';

Template.Cases.onCreated(function () {
  this.editModeCases = new ReactiveVar(false);
  this.individualEditMode = new ReactiveVar(null);
  Meteor.subscribe('cases');
});

Template.registerHelper('formatDate', date => moment(date).format('DD/MM/YY'));

Template.Cases.events({
  'click #editAllCases, click #cancelEditMode': function (event, template) {
    event.preventDefault();

    template.editModeCases.set(!template.editModeCases.get());
    template.individualEditMode.set(null);
  },
  'click .js-edit': function (event, template) {
    event.preventDefault();
    const target = event.target;
    const caseId = target.id;

    template.individualEditMode.set(caseId);
  },
  'click .js-cancel': function (event, template) {
    event.preventDefault();

    template.individualEditMode.set(null);
  },
  'click .js-save': function (event, template) {
    event.preventDefault();
    const target = event.target;
    const caseId = target.id;
    let finalDiagnosis;

    const selectBox = document.getElementById('finalDiagnosis');
    if (selectBox.options[selectBox.selectedIndex].value == '-') {
      //if not filled in, do nothing in database
    } else {
      finalDiagnosis = selectBox.options[selectBox.selectedIndex].value;
    }
    const baselineTroponin = document.getElementsByName('baselineTroponin')[0].value || '-';
    const threeHourTroponin = document.getElementsByName('threeHourTroponin')[0].value || '-';
    const sixHourTroponin = document.getElementsByName('sixHourTroponin')[0].value || '-';

    let newCaseInfo = {
      caseId,
      baselineTroponin,
      threeHourTroponin,
      sixHourTroponin,
    };

    if (finalDiagnosis) {
      newCaseInfo.finalDiagnosis = finalDiagnosis
    }

    template.individualEditMode.set(!template.individualEditMode.get());

    editCase.call(newCaseInfo, (error) => {
      if (error) {
        console.log(error);
        alert(error.reason);
      } else {
        // success
      }
    });
  },
  'click .js-delete': function (event) {
    event.preventDefault();
    const target = event.target;
    const caseId = target.id;

    const args = { caseId };

    if (confirm('Are you sure you want to permanently delete this case?')) {
      deleteCase.call(args, (error) => {
        if (error) {
          console.log(error);
          alert(error.reason);
        } else {
          // success
        }
      });
    }
  },
});

Template.Cases.helpers({
  cases() {
    return Cases.find({}, { sort: { createdAt: -1 } });
  },
  editModeCases() {
    return Template.instance().editModeCases.get();
  },
  individualEditMode(caseId) {
    return (caseId == Template.instance().individualEditMode.get());
  },
  formatIschaemia(ecgIschaemia) {
    if (ecgIschaemia == "nonDiagnostic") {
      return "false";
    } else {
      return "true";
    }
  }
});
