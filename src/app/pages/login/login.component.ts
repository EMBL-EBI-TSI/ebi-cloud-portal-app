import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'ng2-tsi-cloud-portal-lib';
import { CredentialService } from 'ng2-tsi-cloud-portal-lib';
import { ErrorService } from 'ng2-tsi-cloud-portal-lib';

@Component({

  selector: 'login',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ AccountService ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./login.style.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./login.template.html')
})
export class Login {


  constructor(
        public router: Router,
        public accountService: AccountService,
        public credentialService: CredentialService,
        public errorService: ErrorService) {

  }

  login(username, password) {
    this.credentialService.setCredentials(username, password);
    this.accountService.getAccount(this.credentialService)
        .subscribe(
          data => {
              console.log('User data is %O', data);
              this.router.navigateByUrl('/deployments');
          },
          error => {
            console.log('[Login] error %O: ', error);
            this.credentialService.clearCredentials();
            this.errorService.setMessage(<any>error);
            this.router.navigateByUrl('/error');
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
