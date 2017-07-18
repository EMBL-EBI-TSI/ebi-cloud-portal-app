import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CloudProviderParameters } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'edit-cloud-provider-dialog',
  templateUrl: './edit-cloud-provider-dialog.html',
})
export class EditCloudProviderDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  cloudProviderParametersForm: FormGroup;
  cloudProviderNames: string[] = ['AWS','GCP','OSTACK'];

  constructor(private fb: FormBuilder,
              public dialogRef: MdDialogRef<EditCloudProviderDialog>) { 

  }

  public setCloudProviderParameters(cloudProviderParameters: CloudProviderParameters) {
    this.cloudProviderParametersForm = this.fb.group({
      'name': [cloudProviderParameters.name, Validators.required],
      'cloudProvider': [cloudProviderParameters.cloudProvider, Validators.required],
      'fields': this.fb.array([])
    });
  }

  public addNewCloudProviderParametersFormField() {
    console.log('[EditCloudProviderDialog] adding new Cloud Provider parameter field');
    let newGroup = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
    console.log('[EditCloudProviderDialog] created new Cloud Provider parameter form group %O', newGroup);
    (<FormArray>this.cloudProviderParametersForm.controls['fields']).push(newGroup);
  }

}