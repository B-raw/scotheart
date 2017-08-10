import { Meteor } from 'meteor/meteor';
// import './accounts-server-onCreateUser.js';
import '../imports/startup/server/accounts-server-onCreateUser';
import '../imports/startup/server/index';


Meteor.startup(() => {
  // code to run on server at startup
});
