import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import { DeploymentService } from '../services/deployment/deployment.service';
import { CredentialService } from '../services/credential/credential.service';

@Component({
  selector: 'deployments',
  providers: [DeploymentService, CredentialService],
  styles: [ require('./deployments.component.css') ],
  template: require('./deployments.component.html')
})
export class Deployments {
  // Set our default values
  deployments = {};

  // TypeScript public modifiers
  constructor(public router: Router, public deploymentService: DeploymentService, public credentialService: CredentialService) {
    this.deployments = null;

  }

  ngOnInit() {
    console.log('hello `Deployments` component');
    this.deploymentService.getAll(this.credentialService)
        .subscribe(
          deployments => {
            console.log('Deployments data is %O', deployments);
              this.deployments = deployments;
          },
          err => {
              console.log(err);
              this.credentialService.clearCredentials();
              this.router.parent.navigateByUrl('/login');
          },
          () => {
              console.log('Deployment data retrieval complete');
          }
        );
  }

  destroyDeployment(reference: string) {
      console.log("Destroying deployment " + reference);
  }

}
