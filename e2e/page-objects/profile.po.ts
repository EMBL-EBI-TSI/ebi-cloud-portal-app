import { browser, element, by } from 'protractor';
import { TokenService, JwtToken } from 'ng2-cloud-portal-service-lib';

export class ProfilePage {
  
  tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  navigateTo() {
    return browser.get('/profile');
  }

  getGivenName() {
    return element(by.tagName('cp-profile-component'))
            .element(by.css('.content'))
            .element(by.tagName('mat-card'))
            .element(by.tagName('mat-card-content'))
            .element(by.tagName('mat-card-title-group'))
            .element(by.tagName('mat-card-title'))
            .getText();
  }

}
