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

import { ApplicationService } from './application.service';
import { Application } from './application';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('ApplicationService', () => {

  beforeEach(() => {
    addProviders([
      BaseRequestOptions,
      MockBackend,
      provide(Http, {
        useFactory: function (backend, defaultOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }),
      ApplicationService,
      CredentialService,
      provide(ConfigService, { useValue: new ConfigService('some_url/') }),
      ErrorService
    ]);
  });


  it('should get single application data',
    inject([ApplicationService, CredentialService, MockBackend],
      fakeAsync(
        (applicationService, credentialService, mockBackend) => {
          let res;
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
          let res;
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
