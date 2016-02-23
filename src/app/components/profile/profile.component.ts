import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import { AccountService } from '../../services/account/account.service';
import { CredentialService } from '../../services/credential/credential.service';

@Component({
  selector: 'profile',
  providers: [
    AccountService,
    CredentialService
  ],
  styles: [require('./profile.component.css')],
  template: require('./profile.component.html')
})
export class Profile {

  account = {};

  constructor(
      public router: Router,
      public accountService: AccountService,
      public credentialService: CredentialService) {
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
          this.credentialService.clearCredentials();
          this.router.parent.navigateByUrl('/login');
        },
        () => {
          console.log('Account data retrieval complete');
        }
    );
  }

}
