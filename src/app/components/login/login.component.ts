import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import { AccountService } from '../../services/account/account.service';
import { CredentialService } from '../../services/credential/credential.service';


@Component({

  selector: 'login',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    AccountService, 
    CredentialService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./login.component.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./login.component.html')
})
export class Login {


  constructor(public router: Router, public accountService: AccountService, public credentialService: CredentialService) {

  }

  login(event, username, password) {
    event.preventDefault();

    this.credentialService.setCredentials(username, password);
    this.accountService.getAccount(this.credentialService)
        .subscribe(
        data => {
            console.log('User data is %O', data);
            this.router.parent.navigateByUrl('/deployments');
        },
        err => {
            console.log(err);
            this.credentialService.clearCredentials();
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
