import { browser } from 'protractor';
import { LoginPage } from './page-objects/login.po';
import { aapBasicAuth } from './credentials/aap.basic.auth';

describe('Login page', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it('should display Login page message', () => {
    loginPage.navigateTo();
    expect(loginPage.getMessageText()).toEqual('Access the EBI Cloud Portal');
  });

  afterEach(() => {
    browser.manage().logs().get('browser').then(function(browserLogs) {
      // browserLogs is an array of objects with level and message fields
      browserLogs.forEach(function(log){
          if (log.level.value > 900) { // it's an error log
            console.log('Browser console error!');
            console.log(log.message);
          }
      });
    });
  })

  it('should get an error when login with wrong username and password', () => {
    // We can now navigate to the login page
    loginPage.navigateTo();
    // set username
    let username = loginPage.getLoginUsername();
    username.sendKeys('someunexistinguser');
    // set password
    let password = loginPage.getLoginPassword();
    password.sendKeys('somerandomwrongpassword');
    // click login
    let loginButton = loginPage.getLoginButton();
    loginButton.click();
    // expect to get an error
    expect(loginPage.getErrorMessageText()).toEqual('There is a problem...');
  });

  it('should get a welcome message when using the right username and password', () => {
    // We can now navigate to the login page
    loginPage.navigateTo();
    // expect to see the login message
    expect(loginPage.getWelcomeMessageText()).toEqual('Access the EBI Cloud Portal');
    // set username
    let username = loginPage.getLoginUsername();
    username.sendKeys(aapBasicAuth.username);
    // set password
    let password = loginPage.getLoginPassword();
    password.sendKeys(aapBasicAuth.password);
    // click login
    let loginButton = loginPage.getLoginButton();
    loginButton.click();
    // expect to get welcome message
    expect(loginPage.getMessageText()).toEqual('You are logged in as');
  });

  it('should get a valid token when using the right username and password', () => {
    // expect to get a token in local storage
    // We need to hit the browser in order to activate local storage
    browser.get('/');
    let theToken = browser.executeScript('return localStorage.getItem("token");');
    expect(theToken).toBeDefined();
  });

});
