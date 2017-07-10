import { browser, element, by } from 'protractor';

export class AboutPage {
  navigateTo() {
    return browser.get('/about');
  }

  getTitleText() {
    return element(by.css('h1')).getText();
  }
}
