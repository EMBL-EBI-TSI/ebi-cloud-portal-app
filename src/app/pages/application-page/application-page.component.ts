import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Application } from 'ng2-cloud-portal-service-lib';
import { ApplicationService } from 'ng2-cloud-portal-service-lib';
import { VolumeInstance } from 'ng2-cloud-portal-service-lib';
import { VolumeInstanceService } from 'ng2-cloud-portal-service-lib';
import { DeploymentService } from 'ng2-cloud-portal-service-lib';
import { CredentialService } from 'ng2-cloud-portal-service-lib';
import { ErrorService } from 'ng2-cloud-portal-service-lib';
import { TokenService } from 'ng2-cloud-portal-service-lib';
import { ApplicationDeployer } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'application-page',
  styles: [require('./application-page.style.css')],
  template: require('./application-page.template.html')
})
export class ApplicationPage {

  private applicationId: string = 'default';
  private applicationDeployer: ApplicationDeployer;
  private volumeInstances: VolumeInstance[];
  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute, 
    private _applicationService: ApplicationService,
    private _volumeInstanceService: VolumeInstanceService,
    private _deploymentService: DeploymentService,
    private _tokenService: TokenService,
    public credentialService: CredentialService,
    public errorService: ErrorService) {
      
    }

  ngOnInit() {
    this.applicationId = this._route.snapshot.params['id'];
    this._route.params.switchMap(
      (params: Params) => this._applicationService.get(
        this.credentialService.getUsername(),
        this._tokenService.getToken(),
        <Application>{ name:params['id'] }
      )
    ).subscribe(
      (application: Application) => {
        console.log('[ApplicationPage] Got application data %O'+application);
        this.applicationDeployer = <ApplicationDeployer>application;
        this.applicationDeployer.attachedVolumes = {};
        this.applicationDeployer.assignedInputs = {};
      },
      error => {
        console.log('[ApplicationPage] error %O', error[0]);
        this.errorService.setCurrentError(error[0]);
        this._router.navigate(['/error']);
      },
      () => {
        console.log('[ApplicationPage] application data retrieval complete');
      }
    );

    this._volumeInstanceService.getAll(this.credentialService.getUsername(),
        this._tokenService.getToken())
      .subscribe(
      volumeInstances => {
        console.log('[RepositoryComponent] Volume instance data is %O', volumeInstances);
        this.volumeInstances =
          volumeInstances.map((vol: any) => <VolumeInstance>vol);
      },
      error => {
        console.log('[RepositoryComponent] error %O', error);
        this.errorService.setCurrentError(error);
        this._router.navigateByUrl('/error');
      },
      () => {
        console.log('[RepositoryComponent] Volume instance data retrieval complete');
      }
      );

  }
}
