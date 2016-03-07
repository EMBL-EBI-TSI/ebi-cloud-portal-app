import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import { SpyLocation } from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';
import {Router, Location, ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {RouteRegistry} from 'angular2/src/router/route_registry';

import { CredentialService } from './services/credential/credential.service';
import { ConfigService } from './services/config/config.service';
import { ErrorService } from './services/error/error.service';

// Load the implementations that should be tested
import {App} from './app';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    provide(Location, { useClass: SpyLocation }),
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: CredentialService }),
    RouteRegistry,
    provide(Router, { useClass: RootRouter }),
    provide(ConfigService, { useValue: new ConfigService('some_url') }),
    ErrorService,
    CredentialService,
    App
  ]);

  it('should have a group url', inject([ App ], (app) => {
    expect(app.url).toEqual('https://github.com/EMBL-EBI-TSI');
  }));

});
