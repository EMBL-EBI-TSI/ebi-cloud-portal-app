import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ConfigurationDeploymentParameters } from 'ng2-cloud-portal-service-lib/dist';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'edit-deployment-parameters-dialog',
  templateUrl: './edit-deployment-parameters-dialog.html',
})
export class EditDeploymentParametersDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  deploymentParametersForm: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MdDialogRef<EditDeploymentParametersDialog>) { 
    }

  public setDeploymentParameters(deploymentParameters: ConfigurationDeploymentParameters){
    console.log('[EditDeploymentParametersDialog] editing deployment parameter field');
    this.deploymentParametersForm = this.fb.group({
      'name': [deploymentParameters.name, Validators.required],
      'fields': this.fb.array([])
    });

    deploymentParameters.fields.forEach(field =>{
        let previousValues = this.fb.group({
            key: [field.key, Validators.required],
            value: [field.value, Validators.required]
        });
    (<FormArray>this.deploymentParametersForm.controls['fields']).push(previousValues);
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

  public removeDeploymentParametersField(index:number){
    console.log('[EditDeploymentParametersDialog] removing deployment parameter field');
    (<FormArray>this.deploymentParametersForm.controls['fields']).removeAt(index);
  }

}