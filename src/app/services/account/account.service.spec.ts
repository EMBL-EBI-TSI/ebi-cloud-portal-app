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

import { AccountService } from './account.service';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('AccountService', () => {

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
    provide(ROUTER_PRIMARY_COMPONENT, { useValue: AccountService }),
    provide(Router, { useClass: RootRouter }),
    RouteRegistry,
    AccountService,
    CredentialService,
    provide(ConfigService, { useValue: new ConfigService('some_url/') }),
    ErrorService
  ]);

  it('should get account data',
    inject([AccountService, CredentialService, MockBackend],
      fakeAsync(
        (accountService, credentialService, mockBackend) => {
          var res;
          mockBackend.connections.subscribe(c => {
            expect(c.request.url).toBe('some_url/account/username');
            let response = new ResponseOptions(
              { body: `
              {"name": "username", 
              "email": "user@email", 
              "organisation": "user organisation"}
              `}
            );
            c.mockRespond(new Response(response));
          });

          credentialService.setCredentials('username', 'userpassword');
          accountService.getAccount(credentialService).subscribe(
            (_res) => {
              res = _res;
            }
          );
          tick();
          expect(res.name).toBe('username');
          expect(res.email).toBe('user@email');
          expect(res.organisation).toBe('user organisation');
        }
      )
    )
  );

});
