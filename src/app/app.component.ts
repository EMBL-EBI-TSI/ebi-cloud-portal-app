import { Component } from '@angular/core';
import { TokenService } from 'ng2-cloud-portal-service-lib';

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

  constructor(public tokenService: TokenService) {

  }

}
