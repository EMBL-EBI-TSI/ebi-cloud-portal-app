import { Component, OnInit } from '@angular/core';
import { TokenService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(public tokenService: TokenService) { }

  ngOnInit() {
  }

}
