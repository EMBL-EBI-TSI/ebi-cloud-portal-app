import { Component } from 'angular2/core';
import { FORM_DIRECTIVES, CORE_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';

import { VolumeDeployer } from './volume-deployer';
import { Application } from '../../services/application/application';
import { ApplicationService } from '../../services/application/application.service';
import { DeploymentService } from '../../services/deployment/deployment.service';
import { CredentialService } from '../../services/credential/credential.service';
import { AddVolumeSetupForm } from './add-volume-setup-form.component';


@Component({
  selector: 'volumes',
  providers: [
    ApplicationService,
    DeploymentService,
    CredentialService
  ],
  directives: [AddVolumeSetupForm, CORE_DIRECTIVES],
  pipes: [ ],
  styles: [require('./volumes.component.css')],
  template: require('./volumes.component.html')
})
export class Volumes {

  // Set our default values
  volumeDeployers: VolumeDeployer[];

  // TypeScript public modifiers
  constructor(
    public router: Router,
    public applicationService: ApplicationService,
    public deploymentService: DeploymentService,
    public credentialService: CredentialService)
  {
    this.volumeDeployers = [];
  }

  ngOnInit() {
    console.log('[Volumes] on init');
    this.applicationService.getAll(this.credentialService)
        .subscribe(
          volumes => {
              console.log('Volume setup data is %O', volumes);
              this.volumeDeployers = volumes.map(app => <VolumeDeployer>app);
          },
          error => {
              console.log(error);
              this.credentialService.clearCredentials();
              this.router.parent.navigateByUrl('/login');
          },
          () => {
              console.log('Volume data retrieval complete');
          }
        );
  }

  deployVolume(event, volumeDeployer: VolumeDeployer) {
    event.preventDefault();
    volumeDeployer.deploying = true;
    console.log("[Volumes] Adding deployment for volume from " + volumeDeployer.repoUri);
    this.deploymentService.add(this.credentialService, volumeDeployer).subscribe(
      deployment  => {
        this.router.navigateByUrl('/volumes');
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/login');
      }
    );
  }


}
