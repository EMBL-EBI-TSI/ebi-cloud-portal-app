import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';


@Component({
  selector: 'repository', 
  providers: [ ],
  directives: [ ],
  pipes: [ ],
  styles: [ require('./repository.css') ],
  template: require('./repository.html')
})
export class Repository {
  // Set our default values
  data = { value: '' };
  // TypeScript public modifiers
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Repository` component');
  }

}
