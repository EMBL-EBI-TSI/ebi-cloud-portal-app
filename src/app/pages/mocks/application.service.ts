import { provide } from '@angular/core';
import { SpyObject } from './helper';
import { ApplicationService } from 'ng2-cloud-portal-service-lib';

export class MockApplicationService extends SpyObject {
  getAllSpy;
  getSpy;
  addSpy;
  deleteSpy;

  mockObservable;
  fakeResponse;

  constructor() {
    super(ApplicationService);
    this.fakeResponse = null;
    this.getAllSpy = this.spy('getAll').andReturn(this);
    this.getSpy = this.spy('get').andReturn(this);
    this.addSpy = this.spy('add').andReturn(this);
    this.deleteSpy = this.spy('delete').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(response: any): void {
    console.log('Setting repsonse to %O', response);
    this.fakeResponse = response;
  }

  getProviders(): Array<any> {
    return [provide(ApplicationService, { useValue: this })];
  }

}
