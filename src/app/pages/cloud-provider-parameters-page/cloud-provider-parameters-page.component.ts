import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { CloudProviderParametersComponent } from 'ng2-cloud-portal-presentation-lib';
import { ShareDialog } from '../../dialogs/share-dialog/share-dialog.component';
import { EditCloudProviderDialog } from '../../dialogs/edit-cloud-provider-dialog/edit-cloud-provider-dialog.component';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';

@Component({
  selector: 'cloud-provider-parameters-page',
  templateUrl: './cloud-provider-parameters-page.component.html',
  styleUrls: ['./cloud-provider-parameters-page.component.css']
})
export class CloudProviderParametersPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MatDialog, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    let providerName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push({ label: 'Profile', route: 'profile' });
    this.breadcrumbService.breadcrumb.push({ label: providerName, route: 'cloudprovider/' + providerName });
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  openShareCloudProviderDialog(cloudProviderDetail: CloudProviderParametersComponent) {
    let dialogRef = this.dialog.open(ShareDialog);
    dialogRef.afterClosed().subscribe(shareWith => {
      if (shareWith)
        cloudProviderDetail.share(shareWith);
    });
  }

  openEditCloudProviderDialog(cloudProviderDetail: CloudProviderParametersComponent) {
    let dialogRef:MatDialogRef<EditCloudProviderDialog>  = this.dialog.open(EditCloudProviderDialog);
    dialogRef.componentInstance.setCloudProviderParameters(cloudProviderDetail.cloudProviderParametersPresenter);
    dialogRef.afterClosed().subscribe(
      cloudProviderParametersForm => {
        if (cloudProviderParametersForm)
          cloudProviderDetail.updateCloudProviderParameters(cloudProviderParametersForm);
      }
    );
  }

  openConfirmDeleteDialog(cloudProviderDetail: CloudProviderParametersComponent) {
    const config = new MatDialogConfig();
    config.data = [
      'You are about to permanently delete the cloud provider \'' + cloudProviderDetail.cloudProviderParametersPresenter.name +'\'',
      'DELETE',
      'Please confirm',
      'That will also destroy all associated deployments'
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken == 'DELETE')
        cloudProviderDetail.remove();
    });
    
  }

}
