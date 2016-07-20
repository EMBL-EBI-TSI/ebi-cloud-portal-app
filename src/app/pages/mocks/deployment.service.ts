import { provide } from '@angular/core';
import { SpyObject } from './helper';
import { DeploymentService } from 'ng2-cloud-portal-service-lib';

export class MockDeploymentService extends SpyObject {
  getAllSpy;
  deleteSpy;

  mockObservable;
  fakeResponse;

  constructor() {
    super(DeploymentService);
    this.fakeResponse = null;
    this.getAllSpy = this.spy('getAll').andReturn(this);
    this.deleteSpy = this.spy('delete').andReturn(this);
  }

  subscribe(callback) {
    callback(this.fakeResponse);
  }

  setResponse(response: any): void {
    this.fakeResponse = response;
  }

  getProviders(): Array<any> {
    return [provide(DeploymentService, { useValue: this })];
  }

}
