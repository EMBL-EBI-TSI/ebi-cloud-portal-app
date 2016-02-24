import {
  it,
  xit,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


// Load the implementations that should be tested
import {Deployments} from './deployments.component';

describe('Deployments', () => {
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

    Deployments
  ]);

  xit('should have default data', inject([ Deployments ], (deployments) => {
    expect(deployments.data).toEqual({ value: '' });
  }));

  xit('should log ngOnInit', inject([ Deployments ], (deployments) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    deployments.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
