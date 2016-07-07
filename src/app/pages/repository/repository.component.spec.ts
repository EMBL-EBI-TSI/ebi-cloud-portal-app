import {
  it,
  inject,
  injectAsync,
  describe,
  expect,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import { Component, provide } from 'angular2/core';
import { BaseRequestOptions, Http } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing';


// Load the implementations that should be tested
import { Repository } from './repository.component';
import { Application } from '../../services/application/application';

// mocks needed
import { CredentialService } from '../../services/credential/credential.service';
import { ConfigService } from '../../services/config/config.service';
import { ErrorService } from '../../services/error/error.service';
import { MockDeploymentService } from '../mocks/deployment.service';
import { MockApplicationService } from '../mocks/application.service';
import { MockVolumeInstanceService } from '../mocks/volume-instance.service';
import { MockRouterProvider } from '../mocks/routes';
import { MockEvent } from '../mocks/event';

describe('Repository component', () => {
  var mockRouterProvider: MockRouterProvider;
  var mockDeploymentService: MockDeploymentService;
  var mockApplicationService: MockApplicationService;
  var mockVolumeInstanceService: MockVolumeInstanceService;
  var mockEvent: MockEvent;

  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => {
    mockRouterProvider = new MockRouterProvider();
    mockDeploymentService = new MockDeploymentService();
    mockApplicationService = new MockApplicationService();
    mockVolumeInstanceService = new MockVolumeInstanceService();
    mockEvent = new MockEvent();

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
      Repository,
      provide(ConfigService, { useValue: new ConfigService('some_url/') }),
      mockDeploymentService.getProviders(),
      mockApplicationService.getProviders(),
      mockVolumeInstanceService.getProviders(),
      mockRouterProvider.getProviders(),
      mockEvent.getProviders()
    ];
  });

  describe('on initialisation', () => {
    it('asks for the lists of applications and volume instances to the services',
      injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(Repository).then((fixture) => {
          mockApplicationService.setResponse([]);
          mockVolumeInstanceService.setResponse([]);
          fixture.detectChanges();
          expect(mockApplicationService.getAllSpy).toHaveBeenCalled();
          expect(mockVolumeInstanceService.getAllSpy).toHaveBeenCalled();
        });
      })
    );
  });

  describe('when removing an application', () => {
    it('prevents the default event',
      injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(Repository).then((fixture) => {
          let repositoryComponent = fixture.debugElement.componentInstance;
          mockApplicationService.setResponse([]);
          mockVolumeInstanceService.setResponse([]);
          fixture.detectChanges();
          let application = <Application>{ name: 'app_name' };
          repositoryComponent.removeApplication(mockEvent, application);
          expect(mockEvent.preventDefaultSpy).toHaveBeenCalled();
        });
      })
    );

    it('calls for delete on service layer',
      injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(Repository).then((fixture) => {
          let repositoryComponent = fixture.debugElement.componentInstance;
          mockApplicationService.setResponse([]);
          mockVolumeInstanceService.setResponse([]);
          fixture.detectChanges();
          let application = <Application>{ name: 'app_name' };
          repositoryComponent.removeApplication(mockEvent, application);
          expect(mockApplicationService.deleteSpy).toHaveBeenCalled();
        });
      })
    );

    it('asks for the lists of applications and volume instances again',
      injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(Repository).then((fixture) => {
          let repositoryComponent = fixture.debugElement.componentInstance;
          mockApplicationService.setResponse([]);
          mockVolumeInstanceService.setResponse([]);
          fixture.detectChanges();
          let application = <Application>{ name: 'app_name' };
          repositoryComponent.removeApplication(mockEvent, application);
          expect(mockApplicationService.getAllSpy.calls.count()).toBe(2);
          expect(mockVolumeInstanceService.getAllSpy.calls.count()).toBe(2);
        });
      })
    );
  });

  describe('on updating applications', () => {
    it('renders the right message when result is empty',
      injectAsync([TestComponentBuilder], (tcb, cs) => {
        return tcb.createAsync(Repository).then((fixture) => {
          mockApplicationService.setResponse([]);
          mockVolumeInstanceService.setResponse([]);
          fixture.detectChanges();
          var compiled = fixture.debugElement.nativeElement;
          expect(compiled.querySelector('h3')).toHaveText('No applications registered yet');
        });
      })
    );

    it('does not render the empty result message when applies',
      injectAsync([TestComponentBuilder], (tcb, cs) => {
        return tcb.createAsync(Repository).then((fixture) => {
          mockApplicationService.setResponse([
            <Application>{ name: 'app1_name' },
            <Application>{ name: 'app2_name' }]
          );
          mockVolumeInstanceService.setResponse([]);
          fixture.detectChanges();
          var compiled = fixture.debugElement.nativeElement;
          // Each deployment element is rendered using 9 html elements
          expect(compiled.querySelector('h3')).not.toHaveText('No applications registered yet');
        });
      })
    );
  });

});
