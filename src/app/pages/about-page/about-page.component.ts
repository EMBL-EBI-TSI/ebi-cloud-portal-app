import { Component } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'about-page',
  styles: [require('./about-page.style.css')],
  template: require('./about-page.template.html')
})
export class AboutPage {
  ebiLogoWhite = 'assets/img/EMBL_EBI_Logo_white.png';
  ebiLogoBlack = 'assets/img/EMBL_EBI_Logo_black.png';
  ebiLogoLarge = 'assets/img/embl-logo.png';
  ebiLogoOnly = 'assets/img/embl_logo_only.png';
  elixirLogo = 'assets/img/elixir_logo.png';
  cloudsLogo = 'assets/img/clouds_logo.png';

  constructor(public breadcrumbService: BreadcrumbService) {
    
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push( {label:'About', route:'about'} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }
  
}
