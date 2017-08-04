import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef} from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { EditDeploymentParametersDialog  } from '../../dialogs/edit-deployment-parameters-dialog/edit-deployment-parameters-dialog.component';
import { ShareDialog } from '../../dialogs/share-dialog/share-dialog.component';
import { DeploymentParametersComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'app-deployment-parameters-page',
  templateUrl: './deployment-parameters-page.component.html',
  styleUrls: ['./deployment-parameters-page.component.css']
})
export class DeploymentParametersPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog, private _route: ActivatedRoute) {

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
    let dialogRef:MdDialogRef<EditDeploymentParametersDialog> = this.dialog.open(EditDeploymentParametersDialog);
    dialogRef.componentInstance.setDeploymentParameters(deploymentParametersDetail.deploymentParametersPresenter);
    dialogRef.afterClosed().subscribe(
      deploymentParametersForm => {
        if(deploymentParametersForm)
          deploymentParametersDetail.updateDeploymentParameters(deploymentParametersForm);
      }
    );
  }
}