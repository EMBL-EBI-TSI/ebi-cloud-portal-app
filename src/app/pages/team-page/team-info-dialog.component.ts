import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { TeamDetail } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'team-info-dialog',
  templateUrl: './team-info-dialog.html',
})
export class TeamInfoDialog {

  teamDetail: TeamDetail;

  constructor(private _router: Router,
              @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
              public dialogRef: MatDialogRef<TeamInfoDialog>) { 
    
  }

  ngOnInit(): void {
    this.teamDetail = this.dialogData[0];
  }
  
}