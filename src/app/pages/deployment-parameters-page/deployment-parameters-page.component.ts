import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { EditDeploymentParametersDialog  } from '../../dialogs/edit-deployment-parameters-dialog/edit-deployment-parameters-dialog.component';
import { ShareDialog } from '../../dialogs/share-dialog/share-dialog.component';
import { DeploymentParametersComponent } from 'ng2-cloud-portal-presentation-lib';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';

@Component({
  selector: 'app-deployment-parameters-page',
  templateUrl: './deployment-parameters-page.component.html',
  styleUrls: ['./deployment-parameters-page.component.css']
})
export class DeploymentParametersPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MatDialog, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    let deploymentParametersName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push({ label: 'Profile', route: 'profile' });
    this.breadcrumbService.breadcrumb.push({ label: deploymentParametersName, route: 'configuration/deploymentparameters/' + deploymentParametersName });
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  openShareDeploymentParametersDialog(deploymentParametersDetail: DeploymentParametersComponent ) {
    let dialogRef = this.dialog.open(ShareDialog);
    dialogRef.afterClosed().subscribe(shareWith => {
      if (shareWith)
        deploymentParametersDetail.share(shareWith);
    });
  }

  openEditDeploymentParametersDialog(deploymentParametersDetail: DeploymentParametersComponent ){
    let dialogRef:MatDialogRef<EditDeploymentParametersDialog> = this.dialog.open(EditDeploymentParametersDialog);
    dialogRef.componentInstance.setDeploymentParameters(deploymentParametersDetail.deploymentParametersPresenter);
    dialogRef.afterClosed().subscribe(
      deploymentParametersForm => {
        if(deploymentParametersForm)
          deploymentParametersDetail.updateDeploymentParameters(deploymentParametersForm);
      }
    );
  }

  openConfirmDeleteDialog(deploymentParametersDetail: DeploymentParametersComponent) {
    const config = new MatDialogConfig();
    config.data = [
      'You are about to permanently delete the parameters \'' + deploymentParametersDetail.deploymentParametersPresenter.name +'\'',
      'DELETE',
      'Please confirm',
      'That will also destroy all associated deployments'
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken == 'DELETE')
        deploymentParametersDetail.remove();
    });
    
  }

}