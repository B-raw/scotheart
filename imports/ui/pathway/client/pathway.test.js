import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../pathway.js'

describe('Pathway', function() {
  before(function() {
    resetDatabase();
  });

  it('renders Pathway page correctly', function () {
    const data = {};

    withRenderedTemplate('Pathway', data, el => {
      expect($(el).context.innerText).to.include("Pathway");
    });
  });

});
