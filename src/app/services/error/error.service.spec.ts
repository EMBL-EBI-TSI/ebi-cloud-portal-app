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

import { ErrorService } from './error.service';

describe('ErrorService', () => {

  beforeEachProviders(() => [
    ErrorService
  ]);

  it('should set a message', inject([ErrorService], (errorService) => {
    errorService.setMessage('an error message');
    expect(errorService.getMessage()).toEqual('an error message');
  }));

});
