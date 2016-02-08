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
import {Profile} from './profile';

describe('Profile', () => {
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

    Profile
  ]);

  it('should have default data', inject([ Profile ], (profile) => {
    expect(profile.data).toEqual({ value: '' });
  }));

  it('should log ngOnInit', inject([ Profile ], (profile) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    profile.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
