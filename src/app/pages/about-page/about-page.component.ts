import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { CredentialService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  ebiLogoWhite = 'assets/img/EMBL_EBI_Logo_white.png';
  ebiLogoBlack = 'assets/img/EMBL_EBI_Logo_black.png';
  ebiLogoLarge = 'assets/img/embl-logo.png';
  ebiLogoOnly = 'assets/img/embl_logo_only.png';
  lsLogo = 'assets/img/elsri_logo--wosub.png';
  cloudsLogo = 'assets/img/clouds_logo.png';
  ecpMainInfographic = 'assets/img/ecp_main_infographic.png';

  constructor(public breadcrumbService: BreadcrumbService,
    public credentialService: CredentialService) { }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push( {label:'About', route:'about'} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }
  
}
