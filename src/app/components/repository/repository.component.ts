import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import { Application } from '../../services/application/application';
import { ApplicationService } from '../../services/application/application.service';
import { DeploymentService } from '../../services/deployment/deployment.service';
import { CredentialService } from '../../services/credential/credential.service';
import { AddApplicationForm } from './add-application-form.component';

@Component({
  selector: 'repository',
  providers: [
    ApplicationService,
    DeploymentService,
    CredentialService
  ],
  directives: [ AddApplicationForm ],
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
    console.log('[Repository] on init');
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

  addDeployment(event, application: Application) {
    event.preventDefault();
    console.log("[Repository] Adding deployment for application from " + application.repoUri);
    this.deploymentService.add(this.credentialService, application).subscribe(
      deployment  => {
        this.router.navigateByUrl('/deployments');
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/login');
      }
    );
  }


}
