import { AboutPage } from './page-objects/about.po';

describe('About page', () => {
  let aboutPage: AboutPage;

  beforeEach(() => {
    aboutPage = new AboutPage();
  });

  it('should display About page title', () => {
    aboutPage.navigateTo();
    expect(aboutPage.getTitleText()).toEqual('EMBL-EBI Cloud Portal');
  });
});
