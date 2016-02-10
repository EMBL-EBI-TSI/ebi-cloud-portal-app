import {Component} from 'angular2/core';

import {Authentication} from '../services/authentication/authentication';

@Component({
  selector: 'profile',
  styles: [ require('./profile.css') ],
  template: require('./profile.html')
})
export class Profile {

	auth = null;
	currentUser = null;

  constructor(auth: Authentication) {
		this.auth = auth;
		this.currentUser = auth.getUser();
  }

  ngOnInit() {
    console.log('hello *Profile* component');
  }

}
