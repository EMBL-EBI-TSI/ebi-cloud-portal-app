import { provide } from 'angular2/core';
import { SpyObject } from 'angular2/testing_internal';
import { DeploymentService } from '../../services/deployment/deployment.service';

export class MockDeploymentService extends SpyObject {
	getAllSpy;

	mockObservable;
	fakeResponse;

	constructor() {
		super(DeploymentService);
		this.fakeResponse = null;
		this.getAllSpy = this.spy('getAll').andReturn(this);
	}

  subscribe(callback) {
		callback(this.fakeResponse);
  }

  setResponse(json: any): void {
		this.fakeResponse = json;
  }

  getProviders(): Array<any> {
		return [provide(DeploymentService, { useValue: this })];
  }

}
