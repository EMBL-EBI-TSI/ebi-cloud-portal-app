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

import { ErrorService } from './error.service';

describe('ErrorService', () => {

  beforeEachProviders(() => [
    ErrorService
  ]);

  it('message is set', inject([ErrorService], (errorService) => {
    errorService.setMessage('an error message');
    expect(errorService.getMessage()).toEqual('an error message');
  }));

});
