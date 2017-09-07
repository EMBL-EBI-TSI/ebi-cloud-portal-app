import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'error-message-dialog',
  templateUrl: './error-message-dialog.html',
})
export class ErrorMessageDialog {
  robby = 'assets/img/Robby_error0.5x.png';
  errorMessage: string = 'There is an error...';
  actionButtonMessage: string = 'OK';

  constructor(private _router: Router,
              @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
              public dialogRef: MdDialogRef<ErrorMessageDialog>) { 
    
  }

  ngOnInit(): void {
    this.errorMessage = this.dialogData[0];
    this.actionButtonMessage = this.dialogData[1];
  }
  
}