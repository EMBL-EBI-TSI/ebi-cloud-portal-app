import { Component, Renderer } from '@angular/core';
import { LoginComponent } from 'ng2-cloud-portal-presentation-lib';
import { CredentialService, TokenService, AuthService } from 'ng2-cloud-portal-service-lib';
import { JwtToken } from 'ng2-cloud-portal-service-lib';
import { Account } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'login-page',
  directives: [ LoginComponent ],
  providers: [ AuthService, TokenService, CredentialService ],
  styles: [require('./login-page.style.css')],
  template: require('./login-page.template.html')
})
export class LoginPage {

  robby = 'assets/img/Robby form@0.5x.png';
  account: Account;
  removeMessageListener: Function;
  elixirLogo = 'assets/img/elixir_logo.png';
  
  constructor(
    private _authService: AuthService,
    public credentialService: CredentialService,
    public tokenService: TokenService,
    public breadcrumbService: BreadcrumbService,
    renderer: Renderer) {

    // We cache the function "listenGlobal" returns, as it's one that allows to cleanly unregister the event listener
    this.removeMessageListener = renderer.listenGlobal('window', 'message', (event: MessageEvent) => {
      if (!this._authService.canAcceptMessage(event)) {
        console.warn("received unacceptable message! Ignoring...", event);
        return;
      }
      this.saveToken(event.data);
      event.source.close();
    });
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push( {label:'Login', route:'login'} );
  }

  private saveToken(jwt: string) {
    console.log('[LoginPage] Obtained token from saml %O', jwt);
    let theToken: JwtToken = <JwtToken>{ token: jwt };
    this.tokenService.setToken(theToken);
    let tokenClaims = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(jwt.split(".")[1]));
    this.credentialService.setCredentials(tokenClaims.sub, null, tokenClaims.name);
  }

  ssoLink() {
    return this._authService.ssoLink();
  }

  ngOnDestroy() {
    this.removeMessageListener();
    this.breadcrumbService.breadcrumb = [];
  }

}
