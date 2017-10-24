import { browser } from 'protractor';
import { LoginPage } from './page-objects/login.po';
import { ProfilePage } from './page-objects/profile.po';
import { aapBasicAuth } from './credentials/aap.basic.auth';

describe('Profile page', () => {
  let loginPage: LoginPage;
  let profilePage: ProfilePage;

  beforeAll(() => {
    // clear token
    browser.executeScript('localStorage.removeItem("token");');
    browser.get('/');
  })

  beforeEach(() => {
    loginPage = new LoginPage();
    profilePage = new ProfilePage();
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

  it('should get a profile page with given name', () => {
    // We can now navigate to the login page
    loginPage.navigateTo();
    // expect to see the login message
    expect(loginPage.getMessageText()).toEqual('Access the EBI Cloud Portal');
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
    expect(loginPage.getWelcomeMessageText()).toEqual('You are logged in as');

    // navigate to profile
    profilePage.navigateTo();
    // expect the profile page to show the given name
    expect(profilePage.getGivenName()).toBeDefined();
  });

});
