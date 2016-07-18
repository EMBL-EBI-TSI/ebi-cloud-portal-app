import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router';
import { Login } from '../login';
import { About } from '../about';
import { CredentialService } from 'ng2-tsi-cloud-portal-lib';

@Component({
  selector: 'welcome',
  providers: [ CredentialService ],
  directives: [ CORE_DIRECTIVES, Login, About ],
  pipes: [ ],
  styles: [require('./welcome.style.css')],
  template: require('./welcome.template.html')
})
export class Welcome {

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