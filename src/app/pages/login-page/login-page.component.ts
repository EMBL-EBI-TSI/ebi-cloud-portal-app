import { Component, Renderer } from '@angular/core';
import { LoginComponent } from 'ng2-cloud-portal-presentation-lib';
import { AuthService } from '../../auth/auth.service';
import { CredentialService, TokenService, ConfigService} from 'ng2-cloud-portal-service-lib';
import { JwtToken } from 'ng2-cloud-portal-service-lib';

import { Account } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'login-page',
  directives: [ LoginComponent ],
  providers: [ AuthService, TokenService, CredentialService ],
  styles: [require('./login-page.style.css')],
  template: require('./login-page.template.html')
})
export class LoginPage {

  account: Account;
  removeMessageListener: Function;

  constructor(
    private _authService: AuthService,
    public credentialService: CredentialService,
    public tokenService: TokenService,
    private _configService: ConfigService,
    renderer: Renderer) {

    // We cache the function "listenGlobal" returns, as it's one that allows to cleanly unregister the event listener
    this.removeMessageListener = renderer.listenGlobal('window', 'message', (event: MessageEvent) => {
      var apiUrl = this._configService.getApiAddress().replace(/\/$/, "");
      if (event.origin !== apiUrl) {
        log.warn("received message from unexpected origin! ", event.origin);
        return;
      }
      this.saveToken(event.data);
      event.source.close();
    });
  }

  private saveToken(jwt: string) {
    console.log('[LoginPage] Obtained token from saml %O', jwt);
    let theToken: JwtToken = <JwtToken>{ token: jwt };
    this.tokenService.setToken(theToken);
    let tokenClaims = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(jwt.split(".")[1]));
    this.credentialService.setCredentials(tokenClaims.sub, null);
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

  ngOnDestroy() {
    this.removeMessageListener();
  }

}
