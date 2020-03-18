import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import { MatDialog, MatDialogRef } from '@angular/material';
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
              public dialogRef: MatDialogRef<EditCloudProviderDialog>) { 

  }

  public setCloudProviderParameters(cloudProviderParameters: CloudProviderParameters) {
    this.cloudProviderParametersForm = this.fb.group({
      'name': [cloudProviderParameters.name, Validators.required],
      'cloudProvider': [cloudProviderParameters.cloudProvider, Validators.required],
      'fields': this.fb.array([])
    });
    cloudProviderParameters.fields.forEach( field => {
      let newGroup = this.fb.group({
        key: [field.key, Validators.required],
        value: [field.value, Validators.required]
      });
      (<FormArray>this.cloudProviderParametersForm.controls['fields']).push(newGroup);
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

  public removeCloudProviderParametersFormField(fieldIndex: number) {
    console.log('[EditCloudProviderDialog] removing Cloud Provider parameter field at pos %O', fieldIndex);
    (<FormArray>this.cloudProviderParametersForm.controls['fields']).removeAt(fieldIndex);
  }

}