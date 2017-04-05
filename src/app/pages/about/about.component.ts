import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ebiLogoWhite = 'assets/img/EMBL_EBI_Logo_white.png';
  ebiLogoBlack = 'assets/img/EMBL_EBI_Logo_black.png';
  ebiLogoLarge = 'assets/img/embl-logo.png';
  ebiLogoOnly = 'assets/img/embl_logo_only.png';
  elixirLogo = 'assets/img/elixir_logo.png';
  cloudsLogo = 'assets/img/clouds_logo.png';
  
  constructor() { }

  ngOnInit() {
  }

}
