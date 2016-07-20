import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router';
import { LoginPage } from '../login-page';
import { AboutPage } from '../about-page';
import { CredentialService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'welcome-page',
  providers: [ CredentialService ],
  directives: [ CORE_DIRECTIVES, LoginPage, AboutPage ],
  pipes: [ ],
  styles: [require('./welcome-page.style.css')],
  template: require('./welcome-page.template.html')
})
export class WelcomePage {

  constructor( public credentialService: CredentialService,
        public router: Router) {

    }

    goToDeployments() {
        this.router.navigateByUrl('/deployments');
    }

    goToRepository() {
        this.router.navigateByUrl('/repository');
    }

    goToVolumes() {
        this.router.navigateByUrl('/volumes');
    }

}