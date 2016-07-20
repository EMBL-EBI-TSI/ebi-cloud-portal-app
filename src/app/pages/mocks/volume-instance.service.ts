import { provide } from '@angular/core';
import { SpyObject } from './helper';
import { VolumeInstanceService } from 'ng2-cloud-portal-service-lib';

export class MockVolumeInstanceService extends SpyObject {
  getAllSpy;
  addSpy;
  deleteSpy;

  mockObservable;
  fakeResponse;

  constructor() {
    super(VolumeInstanceService);
    this.fakeResponse = null;
    this.getAllSpy = this.spy('getAll').andReturn(this);
    this.addSpy = this.spy('add').andReturn(this);
    this.deleteSpy = this.spy('delete').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(response: any): void {
    this.fakeResponse = response;
  }

  getProviders(): Array<any> {
    return [provide(VolumeInstanceService, { useValue: this })];
  }

}
