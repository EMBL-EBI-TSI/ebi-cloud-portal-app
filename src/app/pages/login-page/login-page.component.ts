import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';
import { CredentialService, TokenService,
        AuthService, JwtToken, Account } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  robby = 'assets/img/Robby_form0.5x.png';
  account: Account;
  removeMessageListener: Function;
  elixirLogo = 'assets/img/elixir_logo.png';
  
  constructor(
    public authService: AuthService,
    public credentialService: CredentialService,
    public tokenService: TokenService,
    public breadcrumbService: BreadcrumbService,
    renderer: Renderer) {

    // We cache the function "listenGlobal" returns, as it's one that allows to cleanly unregister the event listener
    this.removeMessageListener = renderer.listenGlobal('window', 'message', (event: MessageEvent) => {
      if (!this.authService.canAcceptMessage(event)) {
        console.log("received unacceptable message! Ignoring...", event);
        return;
      }
      this.authService.processToken(event.data);
      event.source.close();
    });
  }

  public authenticate(username: string, password: string): any {
    this.authService.authenticateBasic(username,password).subscribe(
      token => {
        console.log('[LoginPage] Obtained token %O', token);
        this.tokenService.setToken(token);
        this.authService.processToken(token.token);
      },
      error => {
        console.log('[LoginPage] Got error ');
      },
      () => {}
    );
  }

  ssoLink() {
    return this.authService.ssoLink();
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push( {label:'Login', route:'login'} );
  }

  ngOnDestroy() {
    this.removeMessageListener();
    this.breadcrumbService.breadcrumb = [];
  }
}
