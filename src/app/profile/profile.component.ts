import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {Account} from '../services/account/account.service';
import {Credentials} from '../services/credentials/credentials.service';

@Component({
  selector: 'profile',
  providers: [
    Account,
    Credentials
  ],
  styles: [require('./profile.component.css')],
  template: require('./profile.component.html')
})
export class Profile {
ser = null;

  profileData = {};

  constructor(public router: Router, public account: Account, public credentials: Credentials) {
    this.profileData = null;
  }

  ngOnInit() {
    console.log('hello *Profile* component');
    this.account.getAccount(this.credentials)
      .subscribe(
        data => {
          console.log('User data is %O', data);
          this.profileData = data;
        },
        err => {
          console.log(err);
          this.credentials.clearCredentials();
          this.router.parent.navigateByUrl('/login');
        },
        () => {
          console.log('Account data retrieval complete');
        }
    );
  }

}
