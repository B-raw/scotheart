Accounts.onCreateUser(function(options, user) {
  // Assigns about to the newly created user object
  user.about = options.about;
  // Returns the user object
  return user;
});
