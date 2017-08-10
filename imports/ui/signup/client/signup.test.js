import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../signup.js'

describe('Sign Up', function() {
  before(function() {
    resetDatabase();
  });

  it('renders sign up page correctly', function () {
    const data = {};

    withRenderedTemplate('Signup', data, el => {
      expect($(el).context.innerText).to.include("Sign Up")
      expect($(el).context.innerHTML).to.include("Name")
      expect($(el).context.innerHTML).to.include("Email")
    });
  });

});
