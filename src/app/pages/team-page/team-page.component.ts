import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { TeamComponent } from 'ng2-cloud-portal-presentation-lib';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  @ViewChild('teamDetail') teamDetail: TeamComponent;

  constructor(public breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute,
    public dialog: MdDialog) {
    
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
    const config = new MdDialogConfig();
    config.data = [
      'Do you want to join ' + this.teamDetail.teamPresenter.name + '?',
      'YES'
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken=='YES') {
        this.teamDetail.requestAddMember(this.teamDetail.credentialService.getEmail(),'/error');
      }
    });

    

    
  }
}
