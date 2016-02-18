import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import { DeploymentInstance } from './deployment-instance';
import { Deployment } from '../../services/deployment/deployment';
import { DeploymentService } from '../../services/deployment/deployment.service';
import { CredentialService } from '../../services/credential/credential.service';

@Component({
  selector: 'deployments',
  providers: [ DeploymentService, CredentialService ],
  styles: [ require('./deployments.component.css') ],
  template: require('./deployments.component.html')
})
export class Deployments {
  // Set our default values
  deploymentInstances: DeploymentInstance[];

  // TypeScript public modifiers
  constructor(public router: Router, public deploymentService: DeploymentService, public credentialService: CredentialService) {
    this.deploymentInstances = [];

  }

  ngOnInit() {
    console.log('[Deployments] on init');
    this.getAllDeployments();
  }

  destroyDeployment(event, deploymentInstance: DeploymentInstance) {
    event.preventDefault();
    console.log('[Deployments] destroying application with reference ' + deploymentInstance.reference);
    deploymentInstance.destroying = true;
    this.deploymentService.delete(this.credentialService, deploymentInstance).subscribe(
      res => {
        console.log('[Deployments] got response %O', res);
        this.getAllDeployments();
      },
      err => {
        console.log('[Deployments] error: ' + err);
        this.credentialService.clearCredentials();
        this.router.navigateByUrl('/login');
      },
      () => {
        console.log('[Deployments] Deployment data retrieval complete');
      }
    );
  }

  private getAllDeployments() {
    this.deploymentService.getAll(this.credentialService)
      .subscribe(
        deployments => {
          console.log('[Deployments] Deployments data is %O', deployments);
          this.deploymentInstances = deployments.map( deployment => <DeploymentInstance> deployment);
        },
        err => {
          console.log('[Deployments] error ' + err);
          this.credentialService.clearCredentials();
          this.router.parent.navigateByUrl('/login');
        },
        () => {
          console.log('[Deployments] deployment data retrieval complete');
        }
      );
  }
}
