import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../definition.js'

describe('Definition', function() {
  before(function() {
    resetDatabase();
  });

  it('renders funding page correctly', function () {
    const data = {};

    withRenderedTemplate('Definition', data, el => {
      expect($(el).context.innerText).to.include("Definition of Myocardial Infarction");
    });
  });

});
