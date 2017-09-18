import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { TeamDetail } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'team-info-dialog',
  templateUrl: './team-info-dialog.html',
})
export class TeamInfoDialog {

  teamDetail: TeamDetail;

  constructor(private _router: Router,
              @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
              public dialogRef: MdDialogRef<TeamInfoDialog>) { 
    
  }

  ngOnInit(): void {
    this.teamDetail = this.dialogData[0];
  }
  
}