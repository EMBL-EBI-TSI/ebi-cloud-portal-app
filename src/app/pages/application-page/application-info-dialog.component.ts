import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { ApplicationDetail } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'application-info-dialog',
  templateUrl: './application-info-dialog.html',
})
export class ApplicationInfoDialog {

  applicationDetail: ApplicationDetail;

  constructor(private _router: Router,
              @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
              public dialogRef: MdDialogRef<ApplicationInfoDialog>) { 
    
  }

  ngOnInit(): void {
    this.applicationDetail = this.dialogData[0];
  }
  
}