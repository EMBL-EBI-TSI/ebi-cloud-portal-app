import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import { ApplicationService } from '../services/application/application.service';
import { DeploymentService } from '../services/deployment/deployment.service';
import { CredentialService } from '../services/credential/credential.service';
import { ApplicationForm } from './application-form.component';

@Component({
  selector: 'repository',
  providers: [
    ApplicationService,
    DeploymentService,
    CredentialService
  ],
  directives: [ ApplicationForm ],
  pipes: [ ],
  styles: [require('./repository.component.css')],
  template: require('./repository.component.html')
})
export class Repository {

  // Set our default values
  applications = {};

  // TypeScript public modifiers
  constructor(
    public router: Router,
    public applicationService: ApplicationService,
    public deploymentService: DeploymentService,
    public credentialService: CredentialService)
  {
    this.applications = null;
  }

  ngOnInit() {
    console.log('hello `Repository` component');
    this.applicationService.getAll(this.credentialService)
        .subscribe(
          applications => {
              console.log('Applications data is %O', applications);
              this.applications = applications;
          },
          error => {
              console.log(error);
              this.credentialService.clearCredentials();
              this.router.parent.navigateByUrl('/login');
          },
          () => {
              console.log('Account data retrieval complete');
          }
        );
  }

  addDeployment( i: number) {
    console.log("Adding deployment for application " + i);
    this.deploymentService.add(this.credentialService);
  }


}
