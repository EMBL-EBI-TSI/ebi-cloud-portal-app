import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { AccountService } from '../../services/account/account.service';
import { CredentialService } from '../../services/credential/credential.service';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'profile',
  providers: [
    AccountService
  ],
  styles: [require('./profile.component.css')],
  template: require('./profile.component.html')
})
export class Profile {

  account = {};

  constructor(
      public router: Router,
      public accountService: AccountService,
      public credentialService: CredentialService,
      public errorService: ErrorService) {
    this.account = null;
  }

  ngOnInit() {
    console.log('hello *Profile* component');
    this.accountService.getAccount(this.credentialService)
      .subscribe(
        account => {
          console.log('User data is %O', account);
          this.account = account;
        },
        err => {
          console.log(err);
          // this.credentialService.clearCredentials();
          // this.router.parent.navigateByUrl('/login');
          this.errorService.setMessage(
            'Error while retrieving account data for user '
            + this.credentialService.getUsername);
          this.router.navigateByUrl('/error');
        },
        () => {
          console.log('Account data retrieval complete');
        }
    );
  }

}
