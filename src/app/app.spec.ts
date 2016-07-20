import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';
import { CredentialService } from 'ng2-cloud-portal-service-lib';
import { Router, RouterConfig } from '@angular/router';
import { RootCmp, createRoot, routerTestProviders, advance } from './pages/mocks/helper';


// Load the implementations that should be tested
import { App } from './app.component';

describe('App', () => {

  const routerConfig: RouterConfig = [ ];

  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App,
    CredentialService,
    routerTestProviders(routerConfig)
  ]);

  it('should have a url', inject([ App ], (app) => {
    expect(app.tsiGithubUrl).toEqual('https://github.com/EMBL-EBI-TSI');
  }));

});
