describe('Three Hour Troponin', function() {
  it('(3 hour troponin change <3 AND <= 16 in woman) routes to MI ruled out', function() {
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

    var headerText = browser.getText("h2");
    expect(headerText).to.include("Myocardial infarction ruled out");
  });

  it('(3 hour troponin change <3 AND <= 34 in man) routes to MI ruled out', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "16")
           .click('input[value="male"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=threeHourTroponin]', "18")
           .click('button[type=submit]');

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/mi-ruled-out")

    var headerText = browser.getText("h2");
    expect(headerText).to.include("Myocardial infarction ruled out");
  });

  it('(female AND 3 hour troponin > 16) routes to MI', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "12")
           .click('input[value="female"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=threeHourTroponin]', "17")
           .click('button[type=submit]');

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/myocardial-injury")

    var headerText = browser.getText("h2");
    expect(headerText).to.contain("Myocardial injury or infarction has occurred");
  });

  it('(male AND 3 hour troponin > 34) routes to MI', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "12")
           .click('input[value="male"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=threeHourTroponin]', "35")
           .click('button[type=submit]');

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/myocardial-injury")

    var headerText = browser.getText("h2");
    expect(headerText).to.contain("Myocardial injury or infarction has occurred");
  });

  it('(male AND  trop change is >3 AND 3 hour troponin is 30) routes to 6 hour trop', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "12")
           .click('input[value="male"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=threeHourTroponin]', "30")
           .click('button[type=submit]')
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/6-hour-troponin")

    var headerText = browser.getText("h3");
    expect(headerText).to.contain("Repeat hs-cTnI measured 6 hours after presentation");
  });

  it('(female AND trop change is >3 AND 3 hour troponin is 15) routes to 6 hour trop', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "6")
           .click('input[value="female"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.setValue('[name=threeHourTroponin]', "12")
           .click('button[type=submit]')
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/6-hour-troponin")

    var headerText = browser.getText("h3");
    expect(headerText).to.contain("Repeat hs-cTnI measured 6 hours after presentation");
  });

  it('does not move forward if 3 hour trop ignored', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "6")
           .click('input[value="female"]')
           .click('button[type=submit]')
           .waitForExist("div");

    browser.click('button[type=submit]')
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/3-hour-troponin")

    var headerText = browser.getText("h3");
    expect(headerText).to.contain("Repeat hs-cTnI measured 3 hours after presentation");
  });

  it("does not go to straight to three hour without a baseline trop", function() {
    browser.url("localhost:3000/3-hour-troponin")
           .waitForExist("div");

    var currentUrl = browser.url().value
    expect(currentUrl).to.equal("http://localhost:3000/initial-assessment")
  });

  it('3 hour troponin page states pathway information', function() {
    browser.url("localhost:3000/baseline-troponin")
           .waitForExist("div");

    browser.setValue('[name=baselineTroponin]', "12")
           .click('input[value="female"]')
           .click('button[type=submit]')
           .waitForExist("div");

    var infoHeaderText = browser.getText(".panel-heading");
    console.log(infoHeaderText)
    expect(infoHeaderText).to.contain("Repeat hs-cTnI measured 3 hours after presentation");

    var informationText = "In female patients with a troponin ≥ 5 but ≤ 16, a repeat troponin should be taken at 3 hours from presentation"

    var infoText = browser.getText(".panel-body")[0];
    expect(infoText).to.contain(informationText);
  });

});
