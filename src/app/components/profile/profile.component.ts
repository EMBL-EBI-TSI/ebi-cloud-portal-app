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
    console.log('[Profile] hello *Profile* component');
    this.accountService.getAccount(this.credentialService)
      .subscribe(
        account => {
          console.log('[Profile] User data is %O', account);
          this.account = account;
        },
        error => {
          console.log('[Profile] error %O: ', error);
          this.errorService.setMessage(<any>error);
          this.router.parent.navigateByUrl('/error');
        },
        () => {
          console.log('[Profile] Account data retrieval complete');
        }
    );
  }

}
