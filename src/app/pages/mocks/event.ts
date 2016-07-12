import { provide } from '@angular/core';
import { SpyObject } from './helper';

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
