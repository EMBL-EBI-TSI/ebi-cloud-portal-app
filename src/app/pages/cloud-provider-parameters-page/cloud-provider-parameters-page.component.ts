import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { CloudProviderParametersComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'app-cloud-provider-parameters-page',
  templateUrl: './cloud-provider-parameters-page.component.html',
  styleUrls: ['./cloud-provider-parameters-page.component.css']
})
export class CloudProviderParametersPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog, private _route: ActivatedRoute) {

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
    let dialogRef = this.dialog.open(ShareCloudProviderDialog);
    dialogRef.afterClosed().subscribe(shareWith => {
      if (shareWith)
        cloudProviderDetail.share(shareWith);
    });
  }
}

@Component({
  selector: 'share-cloud-provider-dialog',
  templateUrl: './share-cloud-provider-dialog.html',
})
export class ShareCloudProviderDialog {
  robby = 'assets/img/Robby_form0.5x.png';

  constructor(public dialogRef: MdDialogRef<ShareCloudProviderDialog>) { }
}