import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'add-team-dialog',
  templateUrl: './add-team-dialog.html',
})
export class AddTeamDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  teamForm: FormGroup;

  constructor(private fb: FormBuilder,
      public dialogRef: MdDialogRef<AddTeamDialog>) { 
    this.teamForm = this.fb.group({
      'name': ['', Validators.required],
      'members': fb.array([])
    });
  }

}