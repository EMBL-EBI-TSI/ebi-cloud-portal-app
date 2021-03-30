import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/Rx';
import { TeamService, TokenService, ErrorService } from 'ng2-cloud-portal-service-lib';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'share-dialog',
  templateUrl: './share-dialog.html',
})
export class ShareDialog {
  robby = 'assets/img/Robby_form0.5x.png';
  shareWithCtrl: FormControl;
  filteredTeams: any;
  teamNames: string[];

  constructor(public teamService: TeamService,
              public tokenService: TokenService,
              public errorService: ErrorService,
              private _router: Router,
              public dialogRef: MatDialogRef<ShareDialog>) {
    this.shareWithCtrl = new FormControl();
    this.teamService.getAllMember(this.tokenService.getToken())
      .subscribe(
      teams => {
        console.log('[ShareDialog] member teams data is %O', teams);
        this.teamNames = teams.map(team => team.name);
        this.filteredTeams = this.shareWithCtrl.valueChanges
        .startWith(null)
        .map(team => this.filterTeams(team));
      },
      error => {
        console.log('[Profile] error %O', error);
        if (error[0]) {
          error = error[0];
        }
        this.errorService.setCurrentError(error);
        this._router.navigateByUrl('/error');
      },
      () => {
          console.log('[ShareDialog] Shared Cloud provider parameters data retrieval complete');
      }
    );

  }

  filterTeams(val: string) {
    return val ? this.teamNames.filter(s => new RegExp(`^${val}`, 'gi').test(s))
               : this.teamNames;
  }

}
