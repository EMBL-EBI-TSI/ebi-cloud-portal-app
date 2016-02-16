import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {Account} from '../services/account/account.service';
import {Credentials} from '../services/credentials/credentials.service';


@Component({

  selector: 'login',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
      Account, 
      Credentials
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./login.component.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./login.component.html')
})
export class Login {


  constructor(public router: Router, public account: Account, public credentials: Credentials) {

  }

  login(event, username, password) {
    event.preventDefault();

    this.credentials.setCredentials(username, password);
    this.account.getAccount(this.credentials)
        .subscribe(
        data => {
            console.log('User data is %O', data);
            this.router.parent.navigateByUrl('/home');
        },
        err => {
            console.log(err);
            this.credentials.clearCredentials();
            this.router.parent.navigateByUrl('/login');
        },
        () => {
            console.log('Authentication Complete');
        }
        );
  }

  ngOnInit() {
    console.log('hello *Login* component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
