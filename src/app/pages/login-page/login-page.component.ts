import { Component } from '@angular/core';
import { LoginComponent } from 'ng2-cloud-portal-presentation-lib';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token.service';
import { JwtToken } from '../../auth/jwt.token';

import { Account } from 'ng2-cloud-portal-service-lib';
import { CredentialService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'login-page',
  directives: [ LoginComponent ],
  providers: [ AuthService ],
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
        this.getAccount(username);
      },
      error => {
        console.log('[LoginPage] Got error ');
      },
      () => {}
    );
  }

  private getAccount(username: string) {
    this._authService.getAccount(
      username, this.tokenService.getToken()).subscribe(
      account => {
        console.log('[LoginPage] Obtained account %O', account);
        this.account = account;
      },
      error => {
        console.log('[LoginPage] Got error ');
      },
      () => {}
    );
  }


}
