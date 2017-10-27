import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'add-repo-dialog',
  templateUrl: './add-repo-dialog.html',
})
export class AddRepoDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  repoUriCtrl: FormControl;

  constructor(public dialogRef: MatDialogRef<AddRepoDialog>) { 
    this.repoUriCtrl = new FormControl();
  }

}