import { Component } from '@angular/core';
import { FORM_DIRECTIVES, CORE_DIRECTIVES } from '@angular/common';
import { NgForm, FormBuilder, Validators, ControlGroup } from '@angular/common';
import { Router } from '@angular/router';

import { VolumeDeployer } from './volume-deployer';
import { VolumeInstanceDeployment } from './volume-instance-deployment';
import { VolumeSetup } from '../../services/volume-setup/volume-setup';
import { VolumeInstance } from '../../services/volume-instance/volume-instance';
import { VolumeSetupService } from '../../services/volume-setup/volume-setup.service';
import { VolumeInstanceService } from '../../services/volume-instance/volume-instance.service';
import { CredentialService } from '../../services/credential/credential.service';
import { ErrorService } from '../../services/error/error.service';


@Component({
  selector: 'volumes',
  providers: [
    VolumeSetupService,
    VolumeInstanceService
  ],
  directives: [ CORE_DIRECTIVES ],
  pipes: [ ],
  styles: [require('./volumes.style.css')],
  template: require('./volumes.template.html')
})
export class Volumes {

  volumeSetupForm: ControlGroup;
  volumeSetupFormShowing: boolean;
  
  // Set our default values
  volumeDeployers: VolumeDeployer[];
  volumeInstanceDeployments: VolumeInstanceDeployment[];

  // TypeScript public modifiers
  constructor(
      fb: FormBuilder,
      public router: Router,
      public volumeSetupService: VolumeSetupService,
      public volumeInstanceService: VolumeInstanceService,
      public credentialService: CredentialService,
      public errorService: ErrorService) {
    this.volumeSetupForm = fb.group({
      repoUri: ['', Validators.required]
    });
    this.volumeDeployers = [];
    this.volumeInstanceDeployments = [];
  }

  ngOnInit() {
    console.log('[Volumes] on init');
    this._updateVolumes();
  }

  deployVolume(event, volumeDeployer: VolumeDeployer) {
    event.preventDefault();
    volumeDeployer.deploying = true;
    console.log('[Volumes] Adding deployment for volume from ' + volumeDeployer.repoUri);
    this.volumeInstanceService.add(this.credentialService, volumeDeployer).subscribe(
      volume  => {
        volumeDeployer.deploying = false;
        this._updateVolumes();
      },
      error => {
        console.log('[Volumes] error %O: ', error);
        this.errorService.setMessage(
            'Could not deploy volume instance. ' + <any>error + '.'
        );
        this.router.navigateByUrl('/error');
      }
    );
  }

  destroyVolume(event, volumeInstanceDeployment: VolumeInstanceDeployment) {
    event.preventDefault();
    volumeInstanceDeployment.destroying = true;
    console.log('[Volumes] Destroying deployment for volume ' + volumeInstanceDeployment.reference);
    this.volumeInstanceService.delete(this.credentialService, volumeInstanceDeployment).subscribe(
      res => {
        console.log('[Volumes] got response %O', res);
        this._updateVolumes();
      },
      error => {
          console.log('[Volumes] error %O: ', error);
          this.errorService.setMessage(
              'Could not destroy volume instance. ' + <any>error + '.'
          );
          this.router.navigateByUrl('/error');
      },
      () => {
        console.log('[Volumes] Volume instance data deletion complete');
      }
    );
  }

  addVolumeSetup(value: any) {
    event.preventDefault();
    console.log('[Volumes] adding ' + value.repoUri);
    this.volumeSetupService.add(this.credentialService, value.repoUri)
      .subscribe(
      volume  => {
        console.log('[Volumes] got response %O', volume);
        this._updateVolumes();
      },
      error => {
        console.log('[Volumes] error %O: ', error);
        this.errorService.setMessage(
            'Could not add volume setup. ' + <any>error + '.'
        );
        this.router.navigateByUrl('/error');
      }
      );
  }

  removeVolumeSetup(event, volumeDeployer: VolumeDeployer) {
    event.preventDefault();
    console.log('[Volumes] removing ' + volumeDeployer.name);

    volumeDeployer.removing = true;

    this.volumeSetupService.delete(this.credentialService, volumeDeployer).subscribe(
      res => {
        console.log('[Volumes] got response %O', res);
        this._updateVolumes();
      },
      error => {
        console.log('[Volumes] error %O: ', error);
        this.errorService.setMessage(
            'Could not remove volume setup. ' + <any>error + '.'
        );
        this.router.navigateByUrl('/error');
      },
      () => {
        console.log('[Volumes] volume setup data deletion complete');
      }
    );
  }

  private _updateVolumes() {
    this.volumeSetupService.getAll(this.credentialService)
      .subscribe(
      volumeSetups => {
        console.log('[Volumes] Volume setup data is %O', volumeSetups);
        this.volumeDeployers = volumeSetups.map(app => <VolumeDeployer>app);
      },
      error => {
        console.log('[Volumes] error %O: ', error);
        this.errorService.setMessage(
            'Could not get the list of volume setups. ' + <any>error + '.'
        );
        this.router.navigateByUrl('/error');
      },
      () => {
        console.log('[Volumes] Volume setup data retrieval complete');
      }
      );

    this.volumeInstanceService.getAll(this.credentialService)
      .subscribe(
      volumeInstances => {
        console.log('[Volumes] Volume instance data is %O', volumeInstances);
        this.volumeInstanceDeployments =
          volumeInstances.map(vol => <VolumeInstanceDeployment>vol);
      },
      error => {
        console.log('[Volumes] error %O: ', error);
        this.errorService.setMessage(
            'Could not get the list of volume instances. ' + <any>error + '.'
        );
        this.router.navigateByUrl('/error');
      },
      () => {
        console.log('[Volumes] Volume instance data retrieval complete');
      }
      );
  }

}
