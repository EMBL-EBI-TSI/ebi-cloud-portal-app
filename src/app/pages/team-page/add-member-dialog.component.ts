import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import { TokenService, ErrorService } from 'ng2-cloud-portal-service-lib';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'add-member-dialog',
  templateUrl: './add-member-dialog.html',
})
export class AddMemberDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  addMemberCtrl: FormControl;

  constructor(public tokenService: TokenService,
              public errorService: ErrorService,
              private _router: Router,
              public dialogRef: MatDialogRef<AddMemberDialog>) { 
    this.addMemberCtrl = new FormControl();
    
  }

}