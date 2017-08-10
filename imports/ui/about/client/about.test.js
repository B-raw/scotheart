import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../about.js'

describe('About', function() {
  before(function() {
    resetDatabase();
  });

  it('renders about page correctly', function () {
    let data = {};

    withRenderedTemplate('About', data, el => {
      expect($(el).context.innerText).to.include("References")
    });
  });
});
