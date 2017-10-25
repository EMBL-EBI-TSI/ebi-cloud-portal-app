import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'suggest-action-dialog',
  templateUrl: './suggest-action-dialog.html',
})
export class SuggestActionDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  suggestionTitle: string = 'A suggestion';
  suggestionMessage: string = 'Maybe you want to...';
  extraInfoMessage: string = '';
  actionButtonMessage: string = 'Do it';
  actionTaken: string = 'add';

  constructor(private _router: Router,
              @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
              public dialogRef: MdDialogRef<SuggestActionDialog>) { 
    
  }

  ngOnInit(): void {
    this.suggestionMessage = this.dialogData[0];
    this.actionButtonMessage = this.dialogData[1];
    if (this.dialogData[2]) {
      this.suggestionTitle = this.dialogData[2];
    }
    if (this.dialogData[3]) {
      this.extraInfoMessage = this.dialogData[3];
    }
  }
}