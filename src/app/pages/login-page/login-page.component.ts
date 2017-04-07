import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';
import { CredentialService, TokenService,
        AuthService, JwtToken, Account } from 'ng2-cloud-portal-service-lib';

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


  ssoLink() {
    return this.authService.ssoLink();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.removeMessageListener();

  }
}
