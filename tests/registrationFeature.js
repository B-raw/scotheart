import { signUpSignIn, signIn, getBrowser, cleanDatabase, addPost } from './testHelpers';

describe('User registration', function () {

  beforeEach(function () {
    cleanDatabase();
  });

  it('shows registration required, new patient etc when logged out', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    var actualText = browser.getText(".jumbotron");
    expect(actualText).to.include("Log Case");
    expect(actualText).to.include("Log In Required");
    expect(actualText).to.include("Try Pathway");

    var headerText = browser.getText("nav");
    expect(headerText).to.include("Log In");
    expect(headerText).to.include("Sign Up");
  });

  it('shows login page when click on New Patient when logged out', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    browser.click("#new-patient")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/login")


    var headerText = browser.getText("div");
    expect(headerText).to.include("Log In To Your Secure High-STEACS Account");
  });

  it('shows login page when click on "Log In Required" when logged out', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    browser.click("#signup-required")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/login")
  });

  it('shows sign up page when click sign up', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    browser.click("#signup")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/signup")

    var headerText = browser.getText("h3");
    expect(headerText).to.include("Sign Up");
  });

  it('can register a new user', function() {
    signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/")

    browser.waitForExist(".jumbotron");

    var jumboText = browser.getText(".jumbotron");
    expect(jumboText).to.include("Log Case");
    // expect(jumboText).to.not.include("Log In Required");
    expect(jumboText).to.include("Try Pathway");

    var newNavText = browser.getText("nav");
    expect(newNavText).to.include("Log Out");
  });

  it('can log out', function() {
    signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")

    browser.waitForExist('#logout');
    browser.click('#logout')
           .waitForExist('#login');

    var navText = browser.getText("nav");
    expect(navText).to.include("Log In");
  })

  describe('when logged in', function() {
    it('shows data collection when click on "New Patient"', function() {
      signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")

      browser.waitForExist('#new-patient-loggedin')
      browser.click("#new-patient-loggedin")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/cases/new")
    });
  });

  it('can log in', function() {
    // signUpSignIn(browser, "Bruce", "Wayne", "batman@hotmail.com", "123321")
    var email = "bat@man.co"
    var password = "123321"

    server.execute(function () {
      var options = {
        email: "bat@man.co",
        password: "123321"
      };
      Accounts.createUser(options);
    });


    browser.url("localhost:3000/")
           .waitForExist("div");
    browser.click('#login')
           .waitForExist('#email');
    browser.setValue('#email', email)
           .setValue('#password', password)
           .click('#submit')
           .waitForExist('.jumbotron');
  });

  it('can choose to register from log in screen', function() {
      browser.click('#logout')
             .waitForExist('nav');

      browser.url("localhost:3000/login")
             .waitForExist("#register-from-login");
      browser.click("#register-from-login")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/signup")

  });

  // it('can view Ts and Cs from signup screen', function() {
  //     browser.url("localhost:3000/signup")
  //            .waitForExist("#tsAndCsPage");
  //     browser.click("#tsAndCsPage")
  //            .waitForExist("div");
  //
  //     var currentUrl = browser.url().value
  //     expect(currentUrl).to.equal("http://localhost:3000/terms-conditions")
  //
  // });

  // it('can view privacy policy from signup screen', function() {
  //     browser.url("localhost:3000/signup")
  //            .waitForExist("#privacyPolicy");
  //     browser.click("#privacyPolicy")
  //            .waitForExist("h4");
  //
  //     var currentUrl = browser.url().value
  //     expect(currentUrl).to.equal("http://localhost:3000/privacy-policy")
  //
  // });


});
