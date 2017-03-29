import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';
import { TokenService, AccountService, CloudProviderParametersService,
  CredentialService, ConfigService, ErrorService } from 'ng2-cloud-portal-service-lib';
import { Router, RouterConfig } from '@angular/router';
import { RootCmp, createRoot, routerTestProviders, advance } from './pages/mocks/helper';
import { provide } from '@angular/core';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';

// Load the implementations that should be tested
import { App } from './app.component';

describe('App', () => {

  const routerConfig: RouterConfig = [ ];

  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App,
    CredentialService,
    CloudProviderParametersService,
    TokenService,
    AccountService,
    ErrorService,
    BreadcrumbService,
    provide(ConfigService, { useValue: new ConfigService('some_url/') }),
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
        useFactory: function (backend, defaultOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }),
    routerTestProviders(routerConfig)
  ]);

  it('should have a url', inject([ App ], (app) => {
    expect(app.tsiGithubUrl).toEqual('https://github.com/EMBL-EBI-TSI');
  }));

});
