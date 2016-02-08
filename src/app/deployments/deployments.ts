import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';


@Component({
  selector: 'deployments',
  providers: [ ],
  directives: [ ],
  pipes: [ ],
  styles: [ require('./deployments.css') ],
  template: require('./deployments.html')
})
export class Deployments {
  // Set our default values
  data = { value: '' };
  // TypeScript public modifiers
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Deployments` component');
  }

}
