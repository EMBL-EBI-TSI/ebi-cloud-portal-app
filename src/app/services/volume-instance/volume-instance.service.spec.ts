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

import { VolumeInstanceService } from './volume-instance.service';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('VolumeInstanceService', () => {

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
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: VolumeInstanceService }),
    provide(Router, { useClass: RootRouter }),
    RouteRegistry,
    VolumeInstanceService,
    CredentialService,
    provide(ConfigService, { useValue: new ConfigService('some_url/') }),
    ErrorService
  ]);

  it('should get all instances',
      inject([VolumeInstanceService, CredentialService, MockBackend],
          fakeAsync(
              (volumeInstanceService, credentialService, mockBackend) => {
                  var res;
                  mockBackend.connections.subscribe(c => {
                      expect(c.request.url).toBe('some_url/volumeinstance/');
                      let response = new ResponseOptions({
                          body: `{"_embedded": {"volumeInstanceResourceList": [
                            {"reference": "tsi-ref-1",
                            "name": "vol_name",
                            "providerId": "provider-id-1"},
                            {"reference": "tsi-ref-2",
                            "name": "vol_name",
                            "providerId": "provider-id-2"}
                            ]}}`
                      });
                      c.mockRespond(new Response(response));
                  });

                  credentialService.setCredentials('username', 'userpassword');
                  volumeInstanceService.getAll(credentialService).subscribe(
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
