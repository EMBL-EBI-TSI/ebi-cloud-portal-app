import { Component } from '@angular/core';
import { FORM_DIRECTIVES, CORE_DIRECTIVES } from '@angular/common';
import { NgForm, FormBuilder, Validators,
  FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router } from '@angular/router';

import { ApplicationDeployer } from './application-deployer';
import { Application } from 'ng2-tsi-cloud-portal-lib';
import { ApplicationService } from 'ng2-tsi-cloud-portal-lib';
import { VolumeInstance } from 'ng2-tsi-cloud-portal-lib';
import { VolumeInstanceService } from 'ng2-tsi-cloud-portal-lib';
import { DeploymentService } from 'ng2-tsi-cloud-portal-lib';
import { CredentialService } from 'ng2-tsi-cloud-portal-lib';
import { ErrorService } from 'ng2-tsi-cloud-portal-lib';

@Component({
  selector: 'repository',
  providers: [
    ApplicationService,
    DeploymentService,
    VolumeInstanceService
  ],
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES ],
  pipes: [ ],
  styles: [require('./repository.style.css')],
  template: require('./repository.template.html')
})
export class Repository {

  applicationForm: FormGroup;

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
    public credentialService: CredentialService,
    public errorService: ErrorService) {

    this.applicationForm = fb.group({
      'repoUri': ['', Validators.required]
    });
    this.applicationDeployers = [];
  }

  ngOnInit() {
    console.log('[Repository] on init.');
    this._updateRepository();
  }

  deployApplication(applicationDeployer: ApplicationDeployer) {
    applicationDeployer.deploying = true;
    console.log('[Repository] Adding deployment for application from '
        + applicationDeployer.repoUri);
    this.deploymentService.add(
        this.credentialService,
        applicationDeployer,
        applicationDeployer.attachedVolumes
    ).subscribe(
      deployment  => {
        this.router.navigateByUrl('/deployments');
      },
      error => {
        console.log('[Repository] error %O: ', error);
        this.errorService.setMessage('Could not deploy application. ' + <any>error + '.');
        this.router.navigateByUrl('/error');
      }
    );
  }

  addApplication(value: any) {
    // event.preventDefault();
    console.log('[Repository] adding ' + value.repoUri);
    let repoUri = value.repoUri;
    this.applicationService.add(this.credentialService, repoUri)
      .subscribe(
      application  => {
        console.log('[Repository] got response %O', application);
        this._updateRepository();
      },
      error => {
        console.log('[Repository] error %O: ', error);
        this.errorService.setMessage(
          'Could not add new application to repository. ' + <any>error + '.'
          );
        this.router.navigateByUrl('/error');
      }
    );

  }

  removeApplication(applicationDeployer: ApplicationDeployer) {
      console.log('[Repository] removing ' + applicationDeployer.name);

      applicationDeployer.destroying = true;

      this.applicationService.delete(this.credentialService, applicationDeployer).subscribe(
        res => {
          console.log('[Repository] got response %O', res);
          this._updateRepository();
        },
        error => {
          console.log('[Repository] error %O: ', error);
          this.errorService.setMessage(
            'Could not delete application from repository. ' + <any>error + '.'
            );
          this.router.navigateByUrl('/error');
        },
        () => {
          console.log('[Repository] Application data deletion complete');
        }
      );
  }

  selectVolume(applicationDeployer, volumeInstanceReference) {
    console.log('[Repository] attaching volume ' + volumeInstanceReference
      + ' to application ' + applicationDeployer.name);
    applicationDeployer.attachedVolumeReference = volumeInstanceReference;
  }

  attachVolume(applicationDeployer, volumeName, volumeInstanceReference) {
      console.log('[Repository] attaching volume ' + volumeName + '=' + volumeInstanceReference
          + ' to application ' + applicationDeployer.name);
      applicationDeployer.attachedVolumes[volumeName] = volumeInstanceReference;
  }

  _updateRepository() {
    this.applicationService.getAll(this.credentialService)
      .subscribe(
      applications => {
          console.log('[Repository] Applications data is %O', applications);
          this.applicationDeployers = applications.map(app => {
              let newApp = <ApplicationDeployer>app;
              newApp.attachedVolumes = {};
              return newApp;
          });
      },
      error => {
        console.log('[Repository] error %O: ', error);
        this.errorService.setMessage(
          'Could not get list of applications. ' + <any>error + '.'
          );
        this.router.navigateByUrl('/error');
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
        console.log('[Repository] error %O: ', error);
        this.errorService.setMessage(
          'Could not get list of volume instances. ' + <any>error + '.'
          );
        this.router.navigateByUrl('/error');
      },
      () => {
        console.log('[Repository] Volume instance data retrieval complete');
      }
      );
  }

}
