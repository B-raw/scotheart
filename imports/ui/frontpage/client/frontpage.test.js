import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../frontpage.js'
import '../../test_helpers.js'

describe('Frontpage', function() {
  before(function() {
    resetDatabase();
  });

  it('renders front page correctly', function () {
    const data = {};

    withRenderedTemplate('Frontpage', data, el => {
      expect($(el).context.innerText).to.include("High-sensitivity Troponin in the Evaluation of Patients with Acute Coronary Syndromes")
      expect($(el).context.innerHTML).to.include("This pathway is for patients with chest pain and suspected acute myocardial infarction evaluated using the Abbott high-sensitivity cardiac troponin I assay")
      expect($(el).context.innerHTML).to.include("Log Case")
      expect($(el).context.innerHTML).to.include("Try Pathway")

    });
  });

});
