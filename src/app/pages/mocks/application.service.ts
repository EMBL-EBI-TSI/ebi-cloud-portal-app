import { provide } from 'angular2/core';
import { SpyObject } from 'angular2/testing_internal';
import { ApplicationService } from '../../services/application/application.service';

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
		this.fakeResponse = response;
  }

  getProviders(): Array<any> {
		return [provide(ApplicationService, { useValue: this })];
  }

}
