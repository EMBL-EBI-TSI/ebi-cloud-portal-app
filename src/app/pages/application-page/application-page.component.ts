import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ApplicationComponent } from 'ng2-cloud-portal-presentation-lib';
import { ShareDialog } from '../../dialogs/share-dialog/share-dialog.component';
import { SuggestActionDialog } from '../../dialogs/suggest-action-dialog/suggest-action-dialog.component';
import { ApplicationInfoDialog } from './application-info-dialog.component';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})
export class ApplicationPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    let appName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push({ label: 'Repository', route: 'repository' });
    this.breadcrumbService.breadcrumb.push({ label: appName, route: 'repository/' + appName });
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  openShareApplicationDialog(applicationDetail: ApplicationComponent) {
    let dialogRef = this.dialog.open(ShareDialog);
    dialogRef.afterClosed().subscribe(shareWith => {
      if (shareWith)
        applicationDetail.share(shareWith);
    });
  }

  openInfoApplicationDialog(applicationDetail: ApplicationComponent) {
    const config = new MdDialogConfig();
    config.data = [
      applicationDetail
    ];
    let dialogRef = this.dialog.open(ApplicationInfoDialog, config);
  }

  openConfirmDeploymentDialog(applicationDetail: ApplicationComponent) {
    const config = new MdDialogConfig();
    config.data = [
      'You are about to deploy \'' + applicationDetail.applicationDeployer.name + '\' using \'' + applicationDetail.selectedConfiguration.name +'\'',
      'DEPLOY',
      'Please confirm'
    ];
    let dialogRef = this.dialog.open(SuggestActionDialog, config);
    dialogRef.afterClosed().subscribe(actionTaken => {
      if (actionTaken == 'DEPLOY')
        applicationDetail.deployApplication(applicationDetail.applicationDeployer)
    });
    
  }
}
