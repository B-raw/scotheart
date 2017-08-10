import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../termsConditions.js'

describe('TermsConditions', function() {
  before(function() {
    resetDatabase();
  });

  it('renders termsConditions page correctly', function () {
    const data = {};

    withRenderedTemplate('TermsConditions', data, el => {
      expect($(el).context.innerText).to.include("Terms and Conditions");
    });
  });

});
