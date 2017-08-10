import { withRenderedTemplate } from '../../test_helpers.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import '../../test_helpers.js'
import '../navbar.js'

// Below not working, need to figure out how to test this when logged in vs logged out
// describe('Navbar', function() {
//   before(function() {
//     resetDatabase();
//   });
//
//   it('when logged in, it renders front page correctly', function () {
//     const data = {};
//
//     var options = {
//       email: "batman@hotmail.com",
//       password: "123321",
//       about: { firstName: "Bruce",
//                lastName: "Wayne",
//                organisation: "RIE",
//                profession: "Doc"
//              }
//     }
//
//     Accounts.createUser(options)
//     Meteor.loginWithPassword("batman@hotmail.com", "123321")
//
//     withRenderedTemplate('Navbar', data, el => {
//       // console.log($(el).context.innerText)
//       expect($(el).context.innerHTML).to.include("Log Out")
//       expect($(el).context.innerHTML).to.include("My Account")
//     });
//
//   });
// });
