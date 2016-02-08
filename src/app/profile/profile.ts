import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';


@Component({
  selector: 'profile',
  providers: [ ],
  directives: [ ],
  pipes: [ ],
  styles: [ require('./profile.css') ],
  template: require('./profile.html')
})
export class Profile {
  // Set our default values
  data = { value: '' };
  // TypeScript public modifiers
  constructor() {

  }

  ngOnInit() {
    console.log('hello *Profile* component');
  }

}
