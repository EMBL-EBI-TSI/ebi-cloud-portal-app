import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'add-cloud-provider-dialog',
  templateUrl: './add-cloud-provider-dialog.html',
})
export class AddCloudProviderDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  cloudProviderParametersForm: FormGroup;
  cloudProviderNames: string[] = ['AWS','GCP','OSTACK', 'AZURE'];

  constructor(private fb: FormBuilder,
              public dialogRef: MdDialogRef<AddCloudProviderDialog>) { 
    this.cloudProviderParametersForm = this.fb.group({
      'name': ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9]+([\\s\\.\\-\\_]?[a-zA-Z0-9]+)*")]
      )],
      'cloudProvider': ['', Validators.required],
      'fields': fb.array([])
    });
  }

  public addNewCloudProviderParametersFormField() {
    console.log('[AddCloudProviderDialog] adding new Cloud Provider parameter field');
    let newGroup = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
    console.log('[AddCloudProviderDialog] created new Cloud Provider parameter form group %O', newGroup);
    (<FormArray>this.cloudProviderParametersForm.controls['fields']).push(newGroup);
  }

}