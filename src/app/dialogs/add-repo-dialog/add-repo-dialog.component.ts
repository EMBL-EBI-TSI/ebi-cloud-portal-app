import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'add-repo-dialog',
  templateUrl: './add-repo-dialog.html',
})
export class AddRepoDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  repoUriCtrl: FormControl;

  constructor(public dialogRef: MdDialogRef<AddRepoDialog>) { 
    this.repoUriCtrl = new FormControl();
  }

}