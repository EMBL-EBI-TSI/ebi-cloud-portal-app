import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'add-deployment-parameters-dialog',
  templateUrl: './add-deployment-parameters-dialog.html',
})
export class AddDeploymentParametersDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  deploymentParametersForm: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddDeploymentParametersDialog>) { 
    this.deploymentParametersForm = this.fb.group({
      'name': ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9]+([\\s\\.\\-\\_]?[a-zA-Z0-9]+)*")]
      )],
      'fields': fb.array([])
    });
  }

  public addNewDeploymentParametersFormField() {
    console.log('[AddDeploymentParametersDialog] adding new deployment parameters field');
    let newGroup = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
    console.log('[AddDeploymentParametersDialog] created new deployment parameters form group %O', newGroup);
    (<FormArray>this.deploymentParametersForm.controls['fields']).push(newGroup);
  }

}