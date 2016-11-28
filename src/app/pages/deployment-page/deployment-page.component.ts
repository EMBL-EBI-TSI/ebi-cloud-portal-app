import { Component } from '@angular/core';
import  { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DeploymentInstance } from 'ng2-cloud-portal-presentation-lib';
import { Deployment } from 'ng2-cloud-portal-service-lib';
import { DeploymentService } from 'ng2-cloud-portal-service-lib';
import { CredentialService } from 'ng2-cloud-portal-service-lib';
import { TokenService } from 'ng2-cloud-portal-service-lib';
import { ErrorService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'deployments-page',
  styles: [require('./deployment-page.style.css')],
  template: require('./deployment-page.template.html')
})
export class DeploymentPage {

  deploymentReference: string;
  deploymentInstance: DeploymentInstance;
  statusFeedSubscription: Subscription;
  outputsFeedSubscription: Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute, 
    private _deploymentService: DeploymentService,
    private _tokenService: TokenService,
    public credentialService: CredentialService,
    public errorService: ErrorService) {
      
    }

  ngOnInit() {
    this.deploymentReference = this._route.snapshot.params['id'];
    this._route.params.switchMap(
      (params: Params) => this._deploymentService.get(
        this.credentialService.getUsername(),
        this._tokenService.getToken(),
        <Deployment>{ reference:params['id'] }
      )
    ).subscribe(
      (deployment: Deployment) => {
        console.log('[DeploymentPage] Got deployment data %O'+deployment);
        this.deploymentInstance = <DeploymentInstance>deployment;
        this.getDeploymentStatus(this.deploymentInstance);
        this.getDeploymentStatusFeed(this.deploymentInstance, 3000);
        this.getDeploymentOutputs(this.deploymentInstance);
        this.getDeploymentOutputsFeed(this.deploymentInstance, 3000);
        console.log('[Deployments] Deployments instance mapped to %O', this.deploymentInstance);
      },
      error => {
        console.log('[DeploymentPage] error %O', error[0]);
        this.errorService.setCurrentError(error[0]);
        this._router.navigate(['/error']);
      },
      () => {
        console.log('[DeploymentPage] deployment data retrieval complete');
      }
    );
  }

  ngOnDestroy() {
    console.log('[DeploymentPage] on destroy');
    if (this.statusFeedSubscription) {
      this.statusFeedSubscription.unsubscribe();
    }
    if (this.outputsFeedSubscription) {
      this.outputsFeedSubscription.unsubscribe();
    }
  }

  public getDeploymentStatus(deploymentInstance: DeploymentInstance) {
    console.log('[DeploymentPage] getting status for deployment '
      + deploymentInstance.reference);
    this._deploymentService.getDeploymentStatus(
        this.credentialService.getUsername(), 
        this._tokenService.getToken(),
        deploymentInstance).subscribe(
      res => {
        console.log('[DeploymentPage] got status response %O', res);
        deploymentInstance.status = res.status;
      },
      error => {
        console.log('[DeploymentPage] status error %O', error);
        this.errorService.setCurrentError(error);
        this._router.navigateByUrl('/error');
      },
      () => {
        console.log('[DeploymentPage] Deployment status data retrieved');
      }
    );
  }

  public getDeploymentStatusFeed(deploymentInstance: DeploymentInstance, interval: number) {
    // console.log('[DeploymentPage] getting status feed for deployment '
    //   + deploymentInstance.reference);
    let statusFeedSubscription = this._deploymentService.getDeploymentStatusFeed(
        this.credentialService.getUsername(), 
        this._tokenService.getToken(),
        deploymentInstance, interval).subscribe(
      res => {
        // console.log('[DeploymentPage] got response %O', res);
        deploymentInstance.status = res.status;
      },
      error => {
        // console.log('[DeploymentPage] error %O', error);
        // this.errorService.setCurrentError(error);
        // this._router.navigateByUrl('/error');
        statusFeedSubscription.unsubscribe();
      },
      () => {
        console.log('[Deployments] Deployment data feed retrieved');
      }
    );
    this.statusFeedSubscription = statusFeedSubscription;
  }

  public getDeploymentOutputs(deploymentInstance: DeploymentInstance) {
    console.log('[DeploymentPage] getting outputs for deployment '
      + deploymentInstance.reference);
    this._deploymentService.getDeploymentOutputs(
        this.credentialService.getUsername(), 
        this._tokenService.getToken(),
        deploymentInstance).subscribe(
      res => {
        console.log('[DeploymentPage] got outputs response %O', res);
        deploymentInstance.generatedOutputs = res;
      },
      error => {
        console.log('[DeploymentPage] outputs error %O', error);
        this.errorService.setCurrentError(error);
        this._router.navigateByUrl('/error');
      },
      () => {
        console.log('[DeploymentPage] Deployment outputs data retrieved');
      }
    );
  }

  public getDeploymentOutputsFeed(deploymentInstance: DeploymentInstance, interval: number) {
    // console.log('[DeploymentPage] getting outputs feed for deployment '
    //   + deploymentInstance.reference);
    let outputsFeedSubscription = this._deploymentService.getDeploymentOutputsFeed(
        this.credentialService.getUsername(), 
        this._tokenService.getToken(),
        deploymentInstance, interval).subscribe(
      res => {
        // console.log('[DeploymentPage] got response %O', res);
        deploymentInstance.generatedOutputs = res;
      },
      error => {
        // console.log('[DeploymentPage] error %O', error);
        // this.errorService.setCurrentError(error);
        // this._router.navigateByUrl('/error');
        outputsFeedSubscription.unsubscribe();
      },
      () => {
        console.log('[DeploymentPage] Deployment data feed retrieved');
      }
    );
    this.outputsFeedSubscription = outputsFeedSubscription;
  }

  public destroyDeployment(deploymentInstance: DeploymentInstance) {
    console.log('[DeploymentPage] destroying deployment with reference '
      + deploymentInstance.reference);
    deploymentInstance.destroying = true;
    this._deploymentService.stop(this.credentialService.getUsername(), this._tokenService.getToken(),
         deploymentInstance).subscribe(
      res => {
        console.log('[DeploymentPage] got response %O', res);
        // Anything else here?
      },
      error => {
        console.log('[DeploymentPage] error %O', error);
        this.errorService.setCurrentError(error);
        this._router.navigateByUrl('/error');
      },
      () => {
        console.log('[DeploymentPage] Deployment destroying requested');
      }
    );
  }

  public deleteDeployment(deploymentInstance: DeploymentInstance) {
    console.log('[DeploymentPage] deleting deployment with reference '
      + deploymentInstance.reference);
    deploymentInstance.destroying = true;
    this._deploymentService.delete(this.credentialService.getUsername(), this._tokenService.getToken(),
         deploymentInstance).subscribe(
      res => {
        console.log('[DeploymentPage] got response %O', res);
        this._router.navigate(['/deployments']);
      },
      error => {
        console.log('[DeploymentPage] error %O', error);
        this.errorService.setCurrentError(error);
        this._router.navigateByUrl('/error');
      },
      () => {
        console.log('[DeploymentPage] Deployment data deletion requested');
      }
    );
  }

}
