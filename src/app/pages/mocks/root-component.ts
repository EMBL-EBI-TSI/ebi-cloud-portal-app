import {
  Component,
  ComponentResolver,
  Injector
} from '@angular/core';
import {
  ROUTER_DIRECTIVES
} from '@angular/router';
// import { TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
import { Repository } from '../repository';
import { Deployments } from '../deployments';
import { Volumes } from '../volumes';
import { Profile } from '../profile';
import { About } from '../about';

@Component({
  selector: 'blank-cmp',
  template: ``,
  directives: [ROUTER_DIRECTIVES]
})
export class BlankCmp {
}

@Component({
  selector: 'root-cmp',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
export class RootCmp {
}