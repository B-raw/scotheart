import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../login.js'

describe('Login', function() {
  before(function() {
    resetDatabase();
  });

  it('renders sign up page correctly', function () {
    const data = {};

    withRenderedTemplate('Login', data, el => {
      expect($(el).context.innerText).to.include("Log In");
      expect($(el).context.innerHTML).to.include("Email");
      expect($(el).context.innerHTML).to.include("Password");
    });
  });

});
