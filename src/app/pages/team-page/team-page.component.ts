import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { TeamComponent } from 'ng2-cloud-portal-presentation-lib';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';
import { TeamInfoDialog } from './team-info-dialog.component';
import { AddMemberDialog } from './add-member-dialog.component';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  @ViewChild('teamDetail') teamDetail: TeamComponent;

  constructor(public breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute,
    public dialog: MatDialog) {
    
  }

  ngOnInit() {
    let teamName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push( {label:'Teams', route:'teams'} );
    this.breadcrumbService.breadcrumb.push( {label:teamName, route:'teams/'+teamName} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  public requestJoin() {
    // Show dialog
    const config = new MatDialogConfig();
    config.data = [
      'Do you want to send a join request to ' + this.teamDetail.teamPresenter.name + '?',
      'YES'
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken=='YES') {
        this.teamDetail.requestAddMember(this.teamDetail.credentialService.getEmail(),'/error');
        const closeConfirmation = new MatDialogConfig();
        closeConfirmation.data = ["Your request has been sent.", "OK", "Request Sent"];
        let closeConfirmationDialogRef = this.dialog.open(SuggestActionDialog, closeConfirmation);
        closeConfirmationDialogRef.afterClosed().subscribe(
          success => {}
        );
      }
    });
    
  }
    
  public leaveTeam() {
    // Show dialog
    const config = new MatDialogConfig();
    config.data = [
      'Do you want to leave the team ' + this.teamDetail.teamPresenter.name + '?',
      'YES'
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken=='YES') {
        this.teamDetail.leaveTeam(this.teamDetail.credentialService.getEmail(),'/error');
        const closeConfirmation = new MatDialogConfig();
        closeConfirmation.data = ["You have left the team successfully.", "OK", "Leave Team"];
        let closeConfirmationDialogRef = this.dialog.open(SuggestActionDialog, closeConfirmation);
        closeConfirmationDialogRef.afterClosed().subscribe(
          success => {}
        );
      }
    });
    
  }

  openAddMemberDialog() {
    let dialogRef = this.dialog.open(AddMemberDialog);
    dialogRef.afterClosed().subscribe(memberAccountEmail => {
      if (memberAccountEmail)
        this.teamDetail.addMember(memberAccountEmail, '/error');
    });
  }

  openInfoTeamDialog(t) {
    const config = new MatDialogConfig();
    config.data = [
      this.teamDetail
    ];
    let dialogRef = this.dialog.open(TeamInfoDialog, config);
  }

}
