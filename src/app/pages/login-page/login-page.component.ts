import { Component } from '@angular/core';
import { LoginComponent } from 'ng2-cloud-portal-presentation-lib';
import { AuthService } from '../../auth/auth.service';
import { JwtToken } from '../../auth/jwt.token';

import { Account } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'login-page',
  directives: [ LoginComponent ],
  providers: [ AuthService ],
  styles: [require('./login-page.style.css')],
  template: require('./login-page.template.html')
})
export class LoginPage {

  jwtToken: JwtToken;
  account: Account;
  username: string;

  constructor( private _authService: AuthService ) {
    
  } 

  getToken(username: string, password: string) {
    this.username = username;
    this._authService.getToken(username,password).subscribe(
      token => {
        console.log('[LoginPage] Obtained token %O', token);
        this.jwtToken = token;
        this.getAccount(this.jwtToken);
      },
      error => {
        console.log('[LoginPage] Got error ');
      },
      () => {}
    );
  }

  getAccount(token: JwtToken) {
    this._authService.getAccount(this.username, token).subscribe(
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
