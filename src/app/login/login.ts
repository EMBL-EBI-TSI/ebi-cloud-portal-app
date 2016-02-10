import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {Authentication} from '../services/authentication/authentication';

@Component({

  selector: 'login',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Authentication
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./login.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./login.html')
})
export class Login {
  // Set our default values
  auth = null;

  constructor(public router: Router, auth: Authentication) {
    this.auth = auth;
  }

  login(event, username, password) {
    event.preventDefault();
    this.auth.login(username, password);
  }

  ngOnInit() {
    console.log('hello *Login* component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
