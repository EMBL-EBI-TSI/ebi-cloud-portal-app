import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTabGroup } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { AddCloudProviderDialog } from '../../dialogs/add-cloud-provider-dialog/add-cloud-provider-dialog.component';
import { AddConfigurationDialog } from '../../dialogs/add-configuration-dialog/add-configuration-dialog.component';
import { AddDeploymentParametersDialog } from '../../dialogs/add-deployment-parameters-dialog/add-deployment-parameters-dialog.component';
import { AddTeamDialog } from '../../dialogs/add-team-dialog/add-team-dialog.component';
import { TeamsComponent } from 'ng2-cloud-portal-presentation-lib';
import { CloudProviderParametersService, TokenService, CredentialService } from 'ng2-cloud-portal-service-lib';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';
import { TeamNameFilterPipe } from './team-name-filter.pipe';

@Component({
  selector: 'teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css']
})
export class TeamsPageComponent implements OnInit {

  @ViewChild('teamsComponent') teamsComponent: TeamsComponent;

  constructor(
    public credentialService: CredentialService,
    public tokenService: TokenService,
    public breadcrumbService: BreadcrumbService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push(
      {label: 'Teams', route: 'teams'}
    );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  ngAfterViewInit() {
    
  }

  openAddTeamDialog() {
    let dialogRef;
    dialogRef = this.dialog.open(AddTeamDialog);
    dialogRef.afterClosed().subscribe(
      teamForm => {
        if (teamForm)
          this.teamsComponent.addTeam(teamForm);
      }
    );
  }

}
