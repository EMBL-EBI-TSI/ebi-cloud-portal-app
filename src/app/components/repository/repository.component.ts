import { Component } from 'angular2/core';
import { FORM_DIRECTIVES, CORE_DIRECTIVES } from 'angular2/common';
import { NgForm, FormBuilder, Validators, ControlGroup } from 'angular2/common';
import { Router } from 'angular2/router';

import { ApplicationDeployer } from './application-deployer';
import { Application } from '../../services/application/application';
import { ApplicationService } from '../../services/application/application.service';
import { VolumeInstance } from '../../services/volume-instance/volume-instance';
import { VolumeInstanceService } from '../../services/volume-instance/volume-instance.service';
import { DeploymentService } from '../../services/deployment/deployment.service';
import { CredentialService } from '../../services/credential/credential.service';


@Component({
  selector: 'repository',
  providers: [
    ApplicationService,
    VolumeInstanceService,
    DeploymentService,
    CredentialService
  ],
  directives: [ CORE_DIRECTIVES ],
  pipes: [ ],
  styles: [require('./repository.component.css')],
  template: require('./repository.component.html')
})
export class Repository {

  applicationForm: ControlGroup;

  // Set our default values
  applicationDeployers: ApplicationDeployer[];
  volumeInstances: VolumeInstance[];

  // TypeScript public modifiers
  constructor(
    fb: FormBuilder,
    public router: Router,
    public applicationService: ApplicationService,
    public volumeInstanceService: VolumeInstanceService,
    public deploymentService: DeploymentService,
    public credentialService: CredentialService) {

    this.applicationForm = fb.group({
      repoUri: ['', Validators.required]
    });
    this.applicationDeployers = [];
  }

  ngOnInit() {
    console.log('[Repository] on init.');
    this._updateRepository();
  }

  deployApplication(event, applicationDeployer: ApplicationDeployer) {
    event.preventDefault();
    applicationDeployer.deploying = true;
    console.log('[Repository] Adding deployment for application from '
        + applicationDeployer.repoUri);
    this.deploymentService.add(
        this.credentialService,
        applicationDeployer,
        applicationDeployer.attachedVolumeReference
    ).subscribe(
      deployment  => {
        this.router.navigateByUrl('/deployments');
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/login');
      }
    );
  }

  addApplication(event) {
    event.preventDefault();
    console.log('[Repository] adding ' + this.applicationForm.value.repoUri);
    this.applicationService.add(this.credentialService, this.applicationForm.value.repoUri)
      .subscribe(
      application  => {
        console.log('[Repository] got response %O', application);
        this._updateRepository();
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/login');
      }
      );
  }

  removeApplication(event, applicationDeployer: ApplicationDeployer) {
      event.preventDefault();
      console.log('[Repository] removing ' + applicationDeployer.name);

      applicationDeployer.destroying = true;

      this.applicationService.delete(this.credentialService, applicationDeployer).subscribe(
          res => {
              console.log('[Repository] got response %O', res);
              this._updateRepository();
          },
          err => {
              console.log('[Repository] error: ' + err);
              this.credentialService.clearCredentials();
              this.router.navigateByUrl('/login');
          },
          () => {
              console.log('[Repository] Application data deletion complete');
          }
      );
  }

  selectVolume(event, applicationDeployer, volumeInstanceReference) {
    event.preventDefault();
    console.log('[Repository] attaching volume ' + volumeInstanceReference
      + ' to application ' + applicationDeployer.name);
    applicationDeployer.attachedVolumeReference = volumeInstanceReference;
  }

  _updateRepository() {
    this.applicationService.getAll(this.credentialService)
      .subscribe(
      applications => {
          console.log('[Repository] Applications data is %O', applications);
        this.applicationDeployers = applications.map(app => <ApplicationDeployer>app);
      },
      error => {
        console.log(error);
        this.credentialService.clearCredentials();
        this.router.parent.navigateByUrl('/login');
      },
      () => {
          console.log('[Repository] Account data retrieval complete');
      }
    );

    this.volumeInstanceService.getAll(this.credentialService)
      .subscribe(
      volumeInstances => {
        console.log('[Repository] Volume instance data is %O', volumeInstances);
        this.volumeInstances =
          volumeInstances.map(vol => <VolumeInstance>vol);
      },
      error => {
        console.log(error);
        this.credentialService.clearCredentials();
        this.router.parent.navigateByUrl('/login');
      },
      () => {
        console.log('[Repository] Volume instance data retrieval complete');
      }
      );
  }

}
