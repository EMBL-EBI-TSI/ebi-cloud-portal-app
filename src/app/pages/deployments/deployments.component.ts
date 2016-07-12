import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import  { Router } from '@angular/router';

import { DeploymentInstance } from './deployment-instance';
import { Deployment } from '../../services/deployment/deployment';
import { DeploymentService } from '../../services/deployment/deployment.service';
import { CredentialService } from '../../services/credential/credential.service';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'deployments',
  styles: [require('./deployments.style.css')],
  template: require('./deployments.template.html'),
  providers: [
    DeploymentService,
    CredentialService,
    ErrorService
  ],
})
export class Deployments {
  // Set our default values
  deploymentInstances: DeploymentInstance[];

  // TypeScript public modifiers
  constructor(
    public router: Router,
    public deploymentService: DeploymentService,
    public credentialService: CredentialService,
    public errorService: ErrorService) {
    this.deploymentInstances = [];

  }

  ngOnInit() {
    console.log('[Deployments] on init');
    this._updateDeployments();
  }

  destroyDeployment(event, deploymentInstance: DeploymentInstance) {
    event.preventDefault();
    console.log('[Deployments] destroying application with reference '
      + deploymentInstance.reference);
    deploymentInstance.destroying = true;
    this.deploymentService.delete(this.credentialService, deploymentInstance).subscribe(
      res => {
        console.log('[Deployments] got response %O', res);
        this._updateDeployments();
      },
      error => {
        console.log('[Deployments] error %O: ', error);
        this.errorService.setMessage(
          'Could not destroy deployment. ' + <any>error + '.'
        );
        this.router.navigateByUrl('/error');
      },
      () => {
        console.log('[Deployments] Deployment data deletion complete');
      }
    );
  }

  private _updateDeployments() {
    this.deploymentService.getAll(this.credentialService)
      .subscribe(
      deployments => {
        console.log('[Deployments] Deployments data is %O', deployments);
        this.deploymentInstances = deployments.map(
          deployment => <DeploymentInstance>deployment
        );
      },
      error => {
        console.log('[Deployments] error %O: ', error);
        this.errorService.setMessage(
          'Could not get deployment list. ' + <any>error + '.'
        );
        this.router.navigateByUrl('/error');
      },
      () => {
        console.log('[Deployments] deployment data retrieval complete');
      }
      );
  }
}
