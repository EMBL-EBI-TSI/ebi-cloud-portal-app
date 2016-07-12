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

import { DeploymentService } from './deployment.service';
import { Deployment } from './deployment';
import { Application } from '../application/application';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('DeploymentService', () => {

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
      DeploymentService,
      CredentialService,
      provide(ConfigService, { useValue: new ConfigService('some_url/') }),
      ErrorService
    ]);
  });


  it('should get all deployments data',
    inject([DeploymentService, CredentialService, MockBackend],
      fakeAsync(
        (deploymentService, credentialService, mockBackend) => {
          let res;
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

  it('should get deployment when adding',
    inject([DeploymentService, CredentialService, MockBackend],
      fakeAsync((deploymentService, credentialService, mockBackend) => {
        let res: Deployment;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('some_url/deployment/');
          let response = new ResponseOptions({
            body: `{"reference": "tsi-ref-1",
                    "applicationName": "app_name",
                    "providerId": "provider-id-1",
                    "accessIp": "access-ip-1",
                    "attachedVolumes": []
                    }`
          });
          c.mockRespond(new Response(response));
        });

        credentialService.setCredentials('username', 'userpassword');
        let application = <Application>{ 'name': 'app_name', 'repoUri': 'app/repo/uri' };
        deploymentService.add(credentialService, application, {}).subscribe(
          (_res) => {
            res = _res;
          }
        );

        tick();
        expect(res).toBeDefined();
        expect(res.applicationName).toBe('app_name');
        expect(res.reference).toBe('tsi-ref-1');
      })
    )
  );

});
