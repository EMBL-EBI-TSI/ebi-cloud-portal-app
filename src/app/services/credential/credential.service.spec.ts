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
} from '@angular/core/testing';

import { CredentialService } from './credential.service';

describe('CredentialService', () => {

  beforeEachProviders(() => [
    CredentialService
  ]);

  it('stores credentials', inject([CredentialService], (credentialService) => {
    credentialService.setCredentials('username', 'password');
    expect(credentialService.getUsername()).toEqual('username');
    expect(credentialService.getPassword()).toEqual('password');
  }));

  it('clears credentials', inject([CredentialService], (credentialService) => {
    credentialService.setCredentials('username', 'password');
    expect(credentialService.getUsername()).toEqual('username');
    expect(credentialService.getPassword()).toEqual('password');
    credentialService.clearCredentials();
    expect(credentialService.getUsername()).toBeNull('username');
    expect(credentialService.getUsername()).toBeNull('password');
  }));

});
