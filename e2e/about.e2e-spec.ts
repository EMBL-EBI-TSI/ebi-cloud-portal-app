import { AboutPage } from './page-objects/about.po';

describe('About page', () => {
  let aboutPage: AboutPage;

  beforeEach(() => {
    aboutPage = new AboutPage();
  });

  it('should display About page title', () => {
    aboutPage.navigateTo();
    expect(aboutPage.getTitleText()).toEqual('A platform for better science');
  });
});
