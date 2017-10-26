import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import { MatDialog, MatDialogRef } from '@angular/material';
import {
  TeamService, TokenService, ErrorService,
  CloudProviderParametersService, CredentialService,
  ConfigurationService
} from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'add-configuration-dialog',
  templateUrl: './add-configuration-dialog.html',
})
export class AddConfigurationDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  configurationForm: FormGroup;
  filteredCloudProviderNames: any;
  cloudProviderNames: string[];
  filteredDeploymentParametersNames: any;
  deploymentParametersNames: string[];

  constructor(private fb: FormBuilder,
    public router: Router,
    public tokenService: TokenService,
    public cloudProviderParametersService: CloudProviderParametersService,
    public configurationService: ConfigurationService,
    public credentialService: CredentialService,
    public errorService: ErrorService,
    public dialogRef: MatDialogRef<AddConfigurationDialog>) {
    this.configurationForm = this.fb.group({
      'name': ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9]+([\\s\\.\\-\\_]?[a-zA-Z0-9]+)*")]
      )],
      'cloudProviderParametersName': ['', Validators.required],
      'sshKey': ['', Validators.required],
      'deploymentParametersName': ['', Validators.required],
    });

    this.cloudProviderParametersService.getOwnedAndSharedCloudProviders(this.credentialService.getUsername(), this.tokenService.getToken())
      .subscribe(
      cloudProviders => {
        console.log('[AddConfigurationDialog] cloud providers data is %O', cloudProviders);
        this.cloudProviderNames = cloudProviders.map(cloudProvider => cloudProvider.name);
        this.filteredCloudProviderNames = this.configurationForm.controls['cloudProviderParametersName'].valueChanges
          .startWith(null)
          .map(cloudProvider => this.filterCloudProviders(cloudProvider));
      },
      error => {
        console.log('[AddConfigurationDialog] error %O', error);
        if (error[0]) {
          error = error[0];
        }
        this.errorService.setCurrentError(error);
        this.router.navigateByUrl('/error');
      },
      () => {
        console.log('[AddConfigurationDialog] Cloud provider parameters data retrieval complete');
      }
      );

     

    this.configurationService.getOwnedAndSharedDeploymentParameters(this.credentialService.getUsername(), this.tokenService.getToken())
      .subscribe(
      deploymentParameters => {
        console.log('[AddConfigurationDialog] deployment parameters data is %O', deploymentParameters);
        this.deploymentParametersNames = deploymentParameters.map(deploymentParameters => deploymentParameters.name);
        this.filteredDeploymentParametersNames = this.configurationForm.controls['deploymentParametersName'].valueChanges
          .startWith(null)
          .map(deploymentParameters => this.filterDeploymentParameters(deploymentParameters));
      },
      error => {
        console.log('[AddConfigurationDialog] error %O', error);
        if (error[0]) {
          error = error[0];
        }
        this.errorService.setCurrentError(error);
        this.router.navigateByUrl('/error');
      },
      () => {
        console.log('[AddConfigurationDialog] Cloud provider parameters data retrieval complete');
      }
      );

    

  }

  filterCloudProviders(val: string) {
    return val ? this.cloudProviderNames.filter(s => new RegExp(`^${val}`, 'gi').test(s))
      : this.cloudProviderNames;
  }

  filterDeploymentParameters(val: string) {
    return val ? this.deploymentParametersNames.filter(s => new RegExp(`^${val}`, 'gi').test(s))
      : this.deploymentParametersNames;
  }

}