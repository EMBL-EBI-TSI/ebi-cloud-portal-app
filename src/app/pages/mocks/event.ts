import { provide } from 'angular2/core';
import { SpyObject } from 'angular2/testing_internal';

export class MockEvent extends SpyObject {

  preventDefaultSpy;

  constructor() {
    super(Event);
    this.preventDefaultSpy = this.spy('preventDefault').andReturn(this);
  }

  getProviders(): Array<any> {
    return [ provide(Event, { useValue: this }) ];
  }

}
