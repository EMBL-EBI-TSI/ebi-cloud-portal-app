import {Component, Renderer} from '@angular/core';
import { TokenService, CredentialService, CloudProviderParameters,
  CloudProviderParametersService, ErrorService, AccountService, AuthService } from 'ng2-cloud-portal-service-lib';
import { Router } from '@angular/router';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ecpLogoWhite = 'assets/img/ecp_logo_white.png';
  ebiLogoBlack = 'assets/img/EMBL_EBI_Logo_black.png';
  ebiLogoWhite = 'assets/img/EMBL_EBI_Logo_white.png';
  name = 'Cloud Portal';
  ebiUrl = 'http://www.ebi.ac.uk/';
  tsiGithubUrl = 'https://github.com/EMBL-EBI-TSI';
  loggedInAccount: Account;
  cloudProviderParameters: CloudProviderParameters[];
  sharedCloudProviderParameters: CloudProviderParameters[];

    constructor(public tokenService: TokenService,
        public credentialService: CredentialService,
        public accountService: AccountService,
        public cloudProviderParametersService: CloudProviderParametersService,
        public errorService: ErrorService,
        public router: Router,
        public breadcrumbService: BreadcrumbService,
        public authService: AuthService,
                renderer: Renderer) {
        if (tokenService.getToken()) {
            this.accountService.getAccount(
                this.credentialService.getUsername(),
                this.tokenService.getToken()
            ).subscribe(
                (account) => {
                    this.loggedInAccount = account;
                }
            );
        }

      renderer.listenGlobal('window', 'message', (event: MessageEvent) => {
        if (!this.authService.canAcceptMessage(event)) {
          console.log("received unacceptable message! Ignoring...", event);
          return;
        }
        if(event.data == "logout")
          event.source.close();
      });

    }


    logOut() {
      this.credentialService.clearCredentials();
      this.tokenService.clearToken();
      window.open(`${this.authService.samlLogoutUrL()}`);
      this.router.navigateByUrl('/welcome');
    }


    public getBreadcrumb() {
        return this.breadcrumbService.breadcrumb;
    }

    public getBreadcrumbUrl() {
        return "#/"+this.breadcrumbService.getAsUrl();
    }
}
