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

// Load the implementations that should be tested
import {App} from './app';
import {Authentication} from './services/authentication/authentication';

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
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: Authentication }),
    RouteRegistry,
    provide(Router, { useClass: RootRouter }),

    Authentication,
    App
  ]);

  it('should have a group url', inject([ App ], (app) => {
    expect(app.url).toEqual('https://github.com/EMBL-EBI-TSI');
  }));

});
