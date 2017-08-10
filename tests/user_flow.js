import { signUpAndSignIn, getBrowser, cleanDatabase } from './testHelpers';

let mainBrowser;

describe('User Flow @watch', function () {

  beforeEach(function () {
    cleanDatabase();
  });

  it('frontpage renders', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");
    var actualText = browser.getText("p");

    expect(actualText).to.include("This pathway is for patients with chest pain and suspected acute myocardial infarction evaluated using the Abbott high-sensitivity cardiac troponin I assay");
  });

  it('click Test Patient, moves to initial assessment page', function() {
    browser.url("localhost:3000/")
           .waitForExist("div");

    browser.click("#begin-assessment")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/initial-assessment")

    var headerText = browser.getText("h2#initial-assess");
    expect(headerText).to.equal("Take baseline high-sensitivity cardiac troponin I (hs-cTnI)");

    var questionText = browser.getText("h2#select-ecg");
    expect(questionText).to.equal("Please select what the ECG showed:");
  });

  describe('Front page', function() {
    it('click "ST-segment elevation", moves to emergency management page', function() {
      browser.url("localhost:3000/initial-assessment")
             .waitForExist("div");

      browser.click("#st-elevation")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/st-elevation")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("Management of ST-segment elevation");

      var bodyText = browser.getText("#st-treatment");
      expect(bodyText).to.contain("Aspirin");
    });

    it('click "ST depression/T wave inversion", moves to emergency management page', function() {
      browser.url("localhost:3000/initial-assessment")
             .waitForExist("div");

      browser.click("#non-st-elevation")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/non-st-elevation")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("ST depression/T wave inversion");

      var bodyText = browser.getText("#non-st-treatment");
      expect(bodyText).to.contain("Aspirin");
    });

    it('has an about page', function() {
      browser.url("localhost:3000/")
             .waitForExist("div");

      browser.click("#about")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/about")

      var headerText = browser.getText("h2");
      expect(headerText).to.equal("References");
    });

    it('has a home page quick link', function() {
      browser.url("localhost:3000/about")
             .waitForExist("h2");

      browser.click("#home")
             .waitForExist("div");

      var currentUrl = browser.url().value
      expect(currentUrl).to.equal("http://localhost:3000/")

      var headerText = browser.getText("p");
      expect(headerText).to.include("This pathway is for patients with chest pain and suspected acute myocardial infarction evaluated using the Abbott high-sensitivity cardiac troponin I assay");
    });

    describe('has two different landing pages for ‘Myocardial infarction ruled out’', function() {
      it('says `discuss with cardio` if 3 hour trop required', function() {
        browser.url("localhost:3000/baseline-troponin")
               .waitForExist("div");

        browser.setValue('[name=baselineTroponin]', "12")
               .click('input[value="female"]')
               .click('button[type=submit]')
               .waitForExist("div");

        browser.setValue('[name=threeHourTroponin]', "14")
               .click('button[type=submit]');

        var currentUrl = browser.url().value
        expect(currentUrl).to.equal("http://localhost:3000/mi-ruled-out")

        var headerText = browser.getText(".panel-body");
        expect(headerText[0]).to.include("Optimise secondary prevention, discuss with cardiology");
      });

      it('says `letter to cardio` if trop < 5', function() {
        browser.url("localhost:3000/baseline-troponin")
               .waitForExist("div");

        browser.setValue('[name=baselineTroponin]', "3")
               .click('input[value="female"]')
               .waitForExist('input[name="painDuration"]');
        browser.click('input[value="false"]')
               .click('button[type=submit]')
               .waitForExist('div');

        var currentUrl = browser.url().value
        expect(currentUrl).to.equal("http://localhost:3000/mi-ruled-out")

        var headerText = browser.getText(".panel-body");
        expect(headerText[0]).to.include("copy discharge letter to cardiology");
      });
    });
  });

  it('can view pathway page from home', function() {
    browser.url("localhost:3000")
           .waitForExist("nav");
    browser.click(".dropdown-toggle")
           .waitForExist("[href='/pathway']");
    browser.click("[href='/pathway']")
           .waitForExist("div");

    var navbarText = browser.getText("nav");
    expect(navbarText).to.include("Pathway");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/pathway")

  });

  it('can view funding page from home', function() {
    browser.url("localhost:3000")
           .waitForExist("nav");
    browser.click(".dropdown-toggle")
           .waitForExist("[href='/funding']");
    browser.click("[href='/funding']")
           .waitForExist("div");

    var navbarText = browser.getText(".panel");
    expect(navbarText).to.include("Funding");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/funding")
  });
});
