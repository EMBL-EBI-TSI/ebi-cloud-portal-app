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

import { ApplicationService } from './application.service';
import { Application } from './application';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('ApplicationService', () => {

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
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: ApplicationService }),
    provide(Router, { useClass: RootRouter }),
    RouteRegistry,
    ApplicationService,
    CredentialService,
    provide(ConfigService, { useValue: new ConfigService('some_url/') }),
    ErrorService
  ]);


  it('should get single application data',
    inject([ApplicationService, CredentialService, MockBackend],
      fakeAsync(
        (applicationService, credentialService, mockBackend) => {
          var res;
          mockBackend.connections.subscribe(c => {
            expect(c.request.url).toBe('some_url/application/app_name');
            let response = new ResponseOptions({
            	body:
            	`{"name": "app_name", "repoUri": "app_url"}`
            });
            c.mockRespond(new Response(response));
          });

          credentialService.setCredentials('username', 'userpassword');
          let application = <Application>{ 'name': 'app_name', 'repoUri': '' };
          applicationService.get(credentialService, application).subscribe(
            (_res) => {
              res = _res;
            }
          );
          tick();
          expect(res.name).toBe('app_name');
          expect(res.repoUri).toBe('app_url');
        }
      )
    )
  );

  it('should get all applications data',
		inject([ApplicationService, CredentialService, MockBackend],
			fakeAsync(
				(applicationService, credentialService, mockBackend) => {
					var res;
					mockBackend.connections.subscribe(c => {
						expect(c.request.url).toBe('some_url/application/');
						let response = new ResponseOptions({
							body: `{"_embedded": {"applicationResourceList": [
				              	{"name": "app_name", "repoUri": "app_url"},
				              	{"name": "another app_name", "repoUri": "another/app_url"}
				            ]}}`
				    });
						c.mockRespond(new Response(response));
					});

					credentialService.setCredentials('username', 'userpassword');
					applicationService.getAll(credentialService).subscribe(
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

});
