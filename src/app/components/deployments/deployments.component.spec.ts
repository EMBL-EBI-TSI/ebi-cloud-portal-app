import {
  it,
  xit,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import { Component, provide } from 'angular2/core';
import { BaseRequestOptions, Http } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing';


// Load the implementations that should be tested
import { Deployments } from './deployments.component';

// mocks needed
import { CredentialService } from '../../services/credential/credential.service';
import { ConfigService } from '../../services/config/config.service';
import { ErrorService } from '../../services/error/error.service';
import { MockDeploymentService } from '../mocks/deployment.service';
import { MockRouterProvider } from '../mocks/routes';

describe('Deployments component', () => {
  var mockRouterProvider: MockRouterProvider;
  var mockDeploymentService: MockDeploymentService;

  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => {
    mockRouterProvider = new MockRouterProvider();
    mockDeploymentService = new MockDeploymentService();
    return [
      BaseRequestOptions,
      MockBackend,
      provide(Http, {
        useFactory: function(backend, defaultOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }),
      CredentialService,
      ErrorService,
      Deployments,
      provide(ConfigService, { useValue: new ConfigService('some_url/') }),
      mockDeploymentService.getProviders(),
      mockRouterProvider.getProviders()
    ];
  });

  describe('on initialisation', () => {
    it('asks for the list of deployments',
      injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(Deployments).then((fixture) => {
          //credentialService.setCredentials('username', 'userpassword');
          mockDeploymentService.setResponse([]);
          fixture.detectChanges();
          expect(mockDeploymentService.getAllSpy).toHaveBeenCalled();
        });
      })
    );
  });

});
