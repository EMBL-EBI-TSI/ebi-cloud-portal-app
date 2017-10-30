import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'error-message-dialog',
  templateUrl: './error-message-dialog.html',
})
export class ErrorMessageDialog {
  robby = 'assets/img/Robby_error0.5x.png';
  errorMessage: string = 'There is an error...';
  actionButtonMessage: string = 'OK';

  constructor(private _router: Router,
              @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
              public dialogRef: MatDialogRef<ErrorMessageDialog>) { 
    
  }

  ngOnInit(): void {
    this.errorMessage = this.dialogData[0];
    this.actionButtonMessage = this.dialogData[1];
  }
  
}