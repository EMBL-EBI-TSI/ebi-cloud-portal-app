import { browser, element, by } from 'protractor';
import { TokenService, JwtToken } from 'ng2-cloud-portal-service-lib';

export class LoginPage {
  
  tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  navigateTo() {
    return browser.get('/login');
  }

  getToken() {
    let aToken = <JwtToken>{
      token:'some_token'
    };
    this.tokenService.setToken(aToken);
  }

  getErrorMessageText() {
    return element(by.tagName('cp-error-component'))
            .element(by.css('.content'))
            .element(by.css('.hero-message'))
            .element(by.tagName('h2'))
            .getText();
  }

  getMessageText() {
    return element(by.css('.content-out'))
            .element(by.tagName('div'))
            .element(by.css('.hero-message'))
            .element(by.tagName('h3'))
            .getText();
  }

  getWelcomeMessageText() {
    return element(by.css('.content'))
            .element(by.tagName('div'))
            .element(by.css('.hero-message'))
            .element(by.tagName('h3'))
            .getText();
  }

  getLoginForm() {
    return element(by.id('login-form'));
  }

  getLoginUsername() {
    return element(by.id('username'));
  }

  getLoginPassword() {
    return element(by.id('password'));
  }

  getLoginButton() {
    return element(by.id('login-button'));
  }

}
