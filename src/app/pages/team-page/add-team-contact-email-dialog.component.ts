import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import { TokenService, ErrorService } from 'ng2-cloud-portal-service-lib';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'add-manager-email-dialog',
  templateUrl: './add-team-contact-email-dialog.html',
})
export class AddTeamContactEmailDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  addTeamContactEmailCtrl: FormControl;

  constructor(public tokenService: TokenService,
              public errorService: ErrorService,
              private _router: Router,
              public dialogRef: MatDialogRef<AddTeamContactEmailDialog>) {
    this.addTeamContactEmailCtrl = new FormControl();

  }

}
