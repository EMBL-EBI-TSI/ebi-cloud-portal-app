import {
  it,
  xit,
  describe,
  expect,
  inject,
  fakeAsync,
  afterEach,
  beforeEachProviders,
  tick,
} from 'angular2/testing';

import { provide } from 'angular2/core';
import { BaseRequestOptions, Http, Response, ResponseOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing';
import { RootRouter } from 'angular2/src/router/router';
import { Router, Location, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { RouteRegistry } from 'angular2/src/router/route_registry';
import { SpyLocation } from 'angular2/src/mock/location_mock';

import { DeploymentService } from './deployment.service';
import { Deployment } from './deployment';
import { Application } from '../application/application';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('DeploymentService', () => {

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
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: DeploymentService }),
    provide(Router, { useClass: RootRouter }),
    RouteRegistry,
      DeploymentService,
    CredentialService,
    provide(ConfigService, { useValue: new ConfigService('some_url/') }),
    ErrorService
  ]);


  it('should get all deployments data',
    inject([DeploymentService, CredentialService, MockBackend],
			fakeAsync(
        (deploymentService, credentialService, mockBackend) => {
					var res;
					mockBackend.connections.subscribe(c => {
						expect(c.request.url).toBe('some_url/deployment/');
						let response = new ResponseOptions({
							body: `{"_embedded": {"deploymentResourceList": [
				              	{"reference": "tsi-ref-1",
                        "applicationName": "app_name",
                        "providerId": "provider-id-1",
                        "accessIp": "access-ip-1",
                        "volumeInstanceReference": "vol-instance-reference"},
                        {"reference": "tsi-ref-2",
                        "applicationName": "app_name",
                        "providerId": "provider-id-2",
                        "accessIp": "access-ip-2",
                        "volumeInstanceReference": null}
				            ]}}`
				    });
						c.mockRespond(new Response(response));
					});

					credentialService.setCredentials('username', 'userpassword');
          deploymentService.getAll(credentialService).subscribe(
							(_res) => {
									res = _res;
							}
					);
					tick();
					expect(res.length).toBe(2);
				}
			)
		)
  );

  // it('should get deployment when adding',
  //   inject([DeploymentService, CredentialService, MockBackend],
  //     fakeAsync((deploymentService, credentialService, mockBackend) => {
  //       var res: Deployment;
  //       mockBackend.connections.subscribe(c => {
  //         expect(c.request.url).toBe('some_url/deployment/');
  //         let response = new ResponseOptions({
  //           body: `{"reference": "tsi-ref-1",
  //                   "applicationName": "app_name",
  //                   "providerId": "provider-id-1",
  //                   "accessIp": "access-ip-1"
  //                   }`
  //         });
  //         c.mockRespond(new Response(response));
  //       });

  //       credentialService.setCredentials('username', 'userpassword');
  //       let application = <Application>{ 'name': 'app_name', 'repoUri': 'app/repo/uri' };
  //       deploymentService.add(credentialService, application).subscribe(
  //           (_res) => {
  //               res = _res;
  //           }
  //       );

  //       tick();
  //       expect(res).toBeDefined();
  //       expect(res.applicationName).toBe('app_name');
  //       expect(res.reference).toBe('tsi-ref-1');
  //     })
  //   )
  // );

});
