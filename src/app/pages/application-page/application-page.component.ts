import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ApplicationComponent } from 'ng2-cloud-portal-presentation-lib';

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
    let dialogRef = this.dialog.open(ShareApplicationDialog);
    dialogRef.afterClosed().subscribe(shareWith => {
      if (shareWith)
        applicationDetail.share(shareWith);
    });
  }
}

@Component({
  selector: 'share-application-dialog',
  templateUrl: './share-application-dialog.html',
})
export class ShareApplicationDialog {
  robby = 'assets/img/Robby_form0.5x.png';

  constructor(public dialogRef: MdDialogRef<ShareApplicationDialog>) { }
}