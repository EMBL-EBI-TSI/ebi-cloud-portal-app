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
  addProviders
} from '@angular/core/testing';

import { provide } from '@angular/core';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { VolumeInstanceService } from './volume-instance.service';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('VolumeInstanceService', () => {

  beforeEach(() => {
    addProviders([
        BaseRequestOptions,
        MockBackend,
        provide(Http, {
        useFactory: function(backend, defaultOptions) {
            return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
        }),

        VolumeInstanceService,
        CredentialService,
        provide(ConfigService, { useValue: new ConfigService('some_url/') }),
        ErrorService
    ]);
  });

  it('should get all instances',
      inject([VolumeInstanceService, CredentialService, MockBackend],
          fakeAsync(
              (volumeInstanceService, credentialService, mockBackend) => {
                  let res;
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
