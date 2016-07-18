import {
  it,
  fakeAsync,
  inject,
  describe,
  expect,
  beforeEachProviders,
  TestComponentBuilder,
  addProviders
} from '@angular/core/testing';
import { Router, RouterConfig } from '@angular/router';
import { Component, provide } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {
  disableDeprecatedForms,
  provideForms,
  FormBuilder
} from '@angular/forms';

import { RootCmp, createRoot, routerTestProviders, advance } from '../mocks/helper';

// Load the implementations that should be tested
import { Repository } from './repository.component';
import { Application } from 'ng2-tsi-cloud-portal-lib';

// mocks needed
import { CredentialService } from 'ng2-tsi-cloud-portal-lib';
import { ConfigService } from 'ng2-tsi-cloud-portal-lib';
import { ErrorService } from 'ng2-tsi-cloud-portal-lib';
import { ApplicationService } from 'ng2-tsi-cloud-portal-lib';
import { DeploymentService } from 'ng2-tsi-cloud-portal-lib';
import { VolumeInstanceService } from 'ng2-tsi-cloud-portal-lib';
import { MockDeploymentService } from '../mocks/deployment.service';
import { MockApplicationService } from '../mocks/application.service';
import { MockVolumeInstanceService } from '../mocks/volume-instance.service';
import { MockEvent } from '../mocks/event';


describe('Repository component', () => {
  let mockDeploymentService: MockDeploymentService;
  let mockApplicationService: MockApplicationService ;
  let mockVolumeInstanceService: MockVolumeInstanceService;
  let mockEvent: MockEvent;

  const routerConfig: RouterConfig = [
    { path: 'repository', component: Repository },
    { path: 'error', component: Error },
    { path: '', component: Repository },
  ];

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    mockDeploymentService = new MockDeploymentService();
    mockApplicationService = new MockApplicationService();
    mockVolumeInstanceService = new MockVolumeInstanceService();
    mockEvent = new MockEvent();

    addProviders([
      BaseRequestOptions,
      MockBackend,
      provide(Http, {
        useFactory: function(backend, defaultOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }),
      routerTestProviders(routerConfig),
      CredentialService,
      ErrorService,
      Repository,
      provide(ConfigService, { useValue: new ConfigService('some_url/') }),
      mockDeploymentService.getProviders(),
      mockApplicationService.getProviders(),
      mockVolumeInstanceService.getProviders(),
      // mockRouterProvider.getProviders(),
      mockEvent.getProviders(),
      disableDeprecatedForms(),
      provideForms(),
      FormBuilder
    ]);
  });

  // describe('on initialisation', () => {
  //   it('asks for the lists of applications and volume instances to the services', fakeAsync(
  //     inject([Router, ApplicationService, DeploymentService,
  //              VolumeInstanceService, TestComponentBuilder],
  //             (router: Router,
  //             mockApplicationService: MockApplicationService,
  //             mockDeploymentService: MockDeploymentService,
  //             mockVolumeInstanceService: MockVolumeInstanceService,
  //             tcb: TestComponentBuilder) => {

  //       const fixture = createRoot(tcb, router, RootCmp);
  //       mockApplicationService.setResponse([]);
  //       mockVolumeInstanceService.setResponse([]);

  //       router.navigateByUrl('/repository');
  //       advance(fixture);

  //       expect(mockApplicationService.getAllSpy).toHaveBeenCalled();
  //       expect(mockVolumeInstanceService.getAllSpy).toHaveBeenCalled();
  //     })));
  //   });

  // describe('when removing an application', () => {
  //   it('prevents the default event', fakeAsync(
  //     inject([TestComponentBuilder], (tcb) => {
  //       return tcb.createAsync(Repository).then((fixture) => {
  //         let repositoryComponent = fixture.debugElement.componentInstance;
  //         mockApplicationService.setResponse([]);
  //         mockVolumeInstanceService.setResponse([]);
  //         fixture.detectChanges();
  //         let application = <Application>{ name: 'app_name' };
  //         repositoryComponent.removeApplication(mockEvent, application);
  //         expect(mockEvent.preventDefaultSpy).toHaveBeenCalled();
  //       });
  //     }))
  //   );

  //   it('calls for delete on service layer', fakeAsync(
  //     inject([TestComponentBuilder], (tcb) => {
  //       return tcb.createAsync(Repository).then((fixture) => {
  //         let repositoryComponent = fixture.debugElement.componentInstance;
  //         mockApplicationService.setResponse([]);
  //         mockVolumeInstanceService.setResponse([]);
  //         fixture.detectChanges();
  //         let application = <Application>{ name: 'app_name' };
  //         repositoryComponent.removeApplication(mockEvent, application);
  //         expect(mockApplicationService.deleteSpy).toHaveBeenCalled();
  //       });
  //     }))
  //   );

  //   it('asks for the lists of applications and volume instances again', fakeAsync(
  //     inject([TestComponentBuilder], (tcb) => {
  //       return tcb.createAsync(Repository).then((fixture) => {
  //         let repositoryComponent = fixture.debugElement.componentInstance;
  //         mockApplicationService.setResponse([]);
  //         mockVolumeInstanceService.setResponse([]);
  //         fixture.detectChanges();
  //         let application = <Application>{ name: 'app_name' };
  //         repositoryComponent.removeApplication(mockEvent, application);
  //         expect(mockApplicationService.getAllSpy.calls.count()).toBe(2);
  //         expect(mockVolumeInstanceService.getAllSpy.calls.count()).toBe(2);
  //       });
  //     }))
  //   );
  // });

  // describe('on updating applications', () => {
  //   it('renders the right message when result is empty', fakeAsync(
  //     inject([TestComponentBuilder], (tcb, cs) => {
  //       return tcb.createAsync(Repository).then((fixture) => {
  //         mockApplicationService.setResponse([]);
  //         mockVolumeInstanceService.setResponse([]);
  //         fixture.detectChanges();
  //         let compiled = fixture.debugElement.nativeElement;
  //         expect(compiled.querySelector('h3')).toHaveText('No applications registered yet');
  //       });
  //     }))
  //   );

  //   it('does not render the empty result message when applies', fakeAsync(
  //     inject([TestComponentBuilder], (tcb, cs) => {
  //       return tcb.createAsync(Repository).then((fixture) => {
  //         mockApplicationService.setResponse([
  //           <Application>{ name: 'app1_name' },
  //           <Application>{ name: 'app2_name' }]
  //         );
  //         mockVolumeInstanceService.setResponse([]);
  //         fixture.detectChanges();
  //         let compiled = fixture.debugElement.nativeElement;
  //         // Each deployment element is rendered using 9 html elements
  //         expect(compiled.querySelector('h3')).not.toHaveText('No applications registered yet');
  //       });
  //     }))
  //   );
  // });

});
