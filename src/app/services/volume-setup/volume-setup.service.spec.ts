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
  addProviders,
} from '@angular/core/testing';

import { provide } from '@angular/core';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { VolumeSetupService } from './volume-setup.service';
import { VolumeSetup } from './volume-setup';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('VolumeSetupService', () => {

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
      VolumeSetupService,
      CredentialService,
      provide(ConfigService, { useValue: new ConfigService('some_url/') }),
      ErrorService
    ]);
  });

  it('should get all applications data',
    inject([VolumeSetupService, CredentialService, MockBackend],
      fakeAsync(
	      (volumeSetupService, credentialService, mockBackend) => {
	        let res;
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
