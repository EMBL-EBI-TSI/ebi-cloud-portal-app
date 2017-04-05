import { EbiCloudPortalPage } from './app.po';

describe('ebi-cloud-portal App', () => {
  let page: EbiCloudPortalPage;

  beforeEach(() => {
    page = new EbiCloudPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
