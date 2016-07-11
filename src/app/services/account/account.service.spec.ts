import {
  it,
  describe,
  expect,
  inject,
  fakeAsync,
  tick
} from '@angular/core/testing';

import {MockBackend} from '@angular/http/testing';
import {provide} from '@angular/core';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

import { AccountService } from './account.service';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';

describe('AccountService', () => {

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend: ConnectionBackend,
                    defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
    }, deps: [MockBackend, BaseRequestOptions]}),
    provide(Location, { useClass: SpyLocation }),
    {provide: LocationStrategy, useClass: HashLocationStrategy},
	  {provide: PlatformLocation, useClass: BrowserPlatformLocation},
    provide(
      Router, 
      { useFactory: (resolver: ComponentResolver, urlSerializer: UrlSerializer,
                   outletMap: RouterOutletMap, location: Location,
                   injector: Injector) => {
       return new Router(
         RootCmp, resolver, urlSerializer, outletMap,
         location, injector, routerConfig);
      },
      deps: [
        ComponentResolver,
        UrlSerializer,
        RouterOutletMap,
        Location,
        Injector
      ]}
    ),
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
