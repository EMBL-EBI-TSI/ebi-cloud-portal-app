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

import { provide } from '@angular/core';

import { ConfigService } from './config.service';

describe('ConfigService', () => {

  beforeEachProviders(() => [
    provide( ConfigService, { useValue: new ConfigService('some_url') })
  ]);

  it('should return the right API url', inject([ConfigService], (configService) => {
    expect(configService.getApiAddress()).toEqual('some_url');
  }));

});
