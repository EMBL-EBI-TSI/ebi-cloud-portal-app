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

  it('should get a login error when using the wrong token', () => {
     // We need to hit the browser in order to activate local storage
    browser.get('/');
    browser.executeScript('localStorage.setItem("token","some token");');

    // We can now navigate to the login page
    loginPage.navigateTo();
    expect(loginPage.getErrorMessageText()).toEqual('There is a problem...');
  });
});
