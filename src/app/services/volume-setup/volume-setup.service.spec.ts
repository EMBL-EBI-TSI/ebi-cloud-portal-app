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

import { VolumeSetupService } from './volume-setup.service';
import { VolumeSetup } from './volume-setup';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('VolumeSetupService', () => {

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
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: VolumeSetupService }),
    provide(Router, { useClass: RootRouter }),
    RouteRegistry,
    VolumeSetupService,
    CredentialService,
    provide(ConfigService, { useValue: new ConfigService('some_url/') }),
    ErrorService
  ]);


  it('should get all applications data',
    inject([VolumeSetupService, CredentialService, MockBackend],
			fakeAsync(
        (volumeSetupService, credentialService, mockBackend) => {
					var res;
					mockBackend.connections.subscribe(c => {
						expect(c.request.url).toBe('some_url/volumesetup/');
						let response = new ResponseOptions({
              body: `{"_embedded": {"volumeSetupResourceList": [
			              	{"name": "volume_name", "repoUri": "volume_url"},
			              	{"name": "another volume_name", "repoUri": "another/volume_url"}
				            ]}}`
				    });
						c.mockRespond(new Response(response));
					});

					credentialService.setCredentials('username', 'userpassword');
          volumeSetupService.getAll(credentialService).subscribe(
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
