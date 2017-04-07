import { Component } from '@angular/core';
import { TokenService, CredentialService } from 'ng2-cloud-portal-service-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ebiLogoBlack = 'assets/img/EMBL_EBI_Logo_black.png';
  ebiLogoWhite = 'assets/img/EMBL_EBI_Logo_white.png';
  name = 'Cloud Portal';
  ebiUrl = 'http://www.ebi.ac.uk/';
  tsiGithubUrl = 'https://github.com/EMBL-EBI-TSI';

  constructor(public tokenService: TokenService,
        public credentialService: CredentialService,
        public router: Router) {

  }

  logOut() {
    this.credentialService.clearCredentials();
    this.tokenService.clearToken();
    this.router.navigateByUrl('/welcome');
  }

}
