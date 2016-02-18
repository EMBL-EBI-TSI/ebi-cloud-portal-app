import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import { CredentialService } from '../../services/credential/credential.service';

@Component({

  selector: 'logout',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    CredentialService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./login.component.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./logout.component.html')

})
export class Logout {

  constructor(public router: Router, public credentialService: CredentialService) {

  }


  ngOnInit() {
    console.log('hello *Login* component');
    this.credentialService.clearCredentials();
    this.router.navigateByUrl('/login');
  }

}
