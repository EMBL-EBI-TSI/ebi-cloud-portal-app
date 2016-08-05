import { Component } from '@angular/core';
import { LoginComponent } from 'ng2-cloud-portal-presentation-lib';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from 'ng2-cloud-portal-service-lib';
import { JwtToken } from 'ng2-cloud-portal-service-lib';

import { Account } from 'ng2-cloud-portal-service-lib';
import { CredentialService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'login-page',
  directives: [ LoginComponent ],
  providers: [ AuthService, TokenService, CredentialService ],
  styles: [require('./login-page.style.css')],
  template: require('./login-page.template.html')
})
export class LoginPage {

  account: Account;

  constructor(
    private _authService: AuthService,
    public credentialService: CredentialService,
    public tokenService: TokenService) {
      
  } 

  public authenticate(username: string, password: string) {
    this._authService.authenticate(username,password).subscribe(
      token => {
        console.log('[LoginPage] Obtained token %O', token);
        this.tokenService.setToken(token);
        this.credentialService.setCredentials(username,password);
      },
      error => {
        console.log('[LoginPage] Got error ');
      },
      () => {}
    );
  }


}
