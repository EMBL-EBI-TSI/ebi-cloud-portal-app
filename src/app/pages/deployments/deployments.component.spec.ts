import { it,
  inject,
  fakeAsync,
  describe,
  expect,
  beforeEachProviders,
  TestComponentBuilder } from '@angular/core/testing';

import { Component, provide } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';


// Load the implementations that should be tested
import { Deployments } from './deployments.component';
import { Deployment } from '../../services/deployment/deployment';

// mocks needed
import { CredentialService } from '../../services/credential/credential.service';
import { ConfigService } from '../../services/config/config.service';
import { ErrorService } from '../../services/error/error.service';
import { MockDeploymentService } from '../mocks/deployment.service';
import { MockEvent } from '../mocks/event';

describe('Deployments component', () => {
  let mockDeploymentService: MockDeploymentService;
  let mockEvent: MockEvent;

  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => {
    mockDeploymentService = new MockDeploymentService();
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
      Deployments,
      provide(ConfigService, { useValue: new ConfigService('some_url/') }),
      mockDeploymentService.getProviders(),
      mockEvent.getProviders()
    ];
  });

  // describe('on initialisation', () => {
  //   it('asks for the list of deployments',
  //     injectAsync([TestComponentBuilder], (tcb) => {
  //       return tcb.createAsync(Deployments).then((fixture) => {
  //         mockDeploymentService.setResponse([]);
  //         fixture.detectChanges();
  //         expect(mockDeploymentService.getAllSpy).toHaveBeenCalled();
  //       });
  //     })
  //   );
  // });

  // describe('when destroying a deployment', () => {
	// 	it('prevents the default event',
	// 		injectAsync([TestComponentBuilder], (tcb) => {
	// 			return tcb.createAsync(Deployments).then((fixture) => {
	// 				let deploymentsComponent = fixture.debugElement.componentInstance;
	// 				mockDeploymentService.setResponse([]);
	// 				fixture.detectChanges();
	// 				let deployment = <Deployment>{ reference: 'deployment_ref' };
	// 				deploymentsComponent.destroyDeployment(mockEvent, deployment);
	// 				expect(mockEvent.preventDefaultSpy).toHaveBeenCalled();
	// 			});
	// 		})
	// 	);

	// 	it('calls for delete on service layer',
	// 		injectAsync([TestComponentBuilder], (tcb) => {
	// 			return tcb.createAsync(Deployments).then((fixture) => {
	// 				let deploymentsComponent = fixture.debugElement.componentInstance;
	// 				mockDeploymentService.setResponse([]);
	// 				fixture.detectChanges();
	// 				let deployment = <Deployment>{ reference: 'deployment_ref' };
	// 				deploymentsComponent.destroyDeployment(mockEvent, deployment);
	// 				expect(mockDeploymentService.deleteSpy).toHaveBeenCalled();
	// 			});
	// 		})
	// 	);

	// 	it('asks for the list of deployments again',
	// 		injectAsync([TestComponentBuilder], (tcb) => {
	// 			return tcb.createAsync(Deployments).then((fixture) => {
	// 					let deploymentsComponent = fixture.debugElement.componentInstance;
	// 					mockDeploymentService.setResponse([]);
	// 					fixture.detectChanges();
	// 					let deployment = <Deployment>{ reference: 'deployment_ref' };
	// 					deploymentsComponent.destroyDeployment(mockEvent, deployment);
	// 					expect(mockDeploymentService.getAllSpy.calls.count()).toBe(2);
	// 			});
	// 		})
  //   );
  // });

	// describe('on updating deployments', () => {
	// 	it('renders the right message when result is empty',
	// 		injectAsync([TestComponentBuilder, CredentialService], (tcb, cs) => {
	// 			return tcb.createAsync(Deployments).then((fixture) => {
	// 				mockDeploymentService.setResponse([]);
	// 				cs.setCredentials('tsi', 'password');
	// 				fixture.detectChanges();
	// 				let compiled = fixture.debugElement.nativeElement;
	// 				expect(compiled.querySelector('h3')).toHaveText('No deployments for user tsi yet');
	// 			});
	// 		})
	// 	);

	// 	it('renders the right number of elements',
	// 		injectAsync([TestComponentBuilder, CredentialService], (tcb, cs) => {
	// 			return tcb.createAsync(Deployments).then((fixture) => {
	// 				mockDeploymentService.setResponse([
	// 					<Deployment>{ reference: 'deployment1_ref' },
	// 					<Deployment>{ reference: 'deployment2_ref' }]
	// 				);
	// 				cs.setCredentials('tsi', 'password');
	// 				fixture.detectChanges();
	// 				let compiled = fixture.debugElement.nativeElement;
	// 				// Each deployment element is rendered using 9 html elements
	// 				expect(compiled.querySelector('div').childNodes.length).toBe(18);
	// 			});
	// 		})
	// 	);
	// });

});
