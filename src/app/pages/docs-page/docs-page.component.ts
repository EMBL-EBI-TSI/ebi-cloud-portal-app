import { Component } from '@angular/core';

@Component({
  selector: 'docs-page',
  styles: [require('./docs-page.style.css')],
  template: require('./docs-page.template.html')
})
export class DocsPage {
  ebiLogoWhite = 'assets/img/EMBL_EBI_Logo_white.png';
  ebiLogoBlack = 'assets/img/EMBL_EBI_Logo_black.png';
  ebiLogoLarge = 'assets/img/embl-logo.png';
  ebiLogoOnly = 'assets/img/embl_logo_only.png';
  elixirLogo = 'assets/img/elixir_logo.png';
  cloudsLogo = 'assets/img/clouds_logo.png';
  constructor() {

  }

  ngOnInit() {

  }

}
