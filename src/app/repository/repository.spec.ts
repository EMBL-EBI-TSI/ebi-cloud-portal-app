import {
  it,
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
import {Repository} from './repository';

describe('Repository', () => {
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

    Repository
  ]);

  it('should have default data', inject([ Repository ], (repository) => {
    expect(repository.data).toEqual({ value: '' });
  }));

  it('should log ngOnInit', inject([ Repository ], (repository) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    repository.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
