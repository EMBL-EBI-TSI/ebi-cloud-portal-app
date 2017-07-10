import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ConfigurationComponent } from 'ng2-cloud-portal-presentation-lib';
import { ShareDialog } from '../../dialogs/share-dialog/share-dialog.component';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.css']
})
export class ConfigurationPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog, private _route: ActivatedRoute) {

  }

  ngOnInit() {
    let configurationName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push({ label: 'Profile', route: 'profile' });
    this.breadcrumbService.breadcrumb.push({ label: configurationName, route: 'configuration/' + configurationName });
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  openShareConfigurationDialog(configurationDetail: ConfigurationComponent) {
    let dialogRef = this.dialog.open(ShareDialog);
    dialogRef.afterClosed().subscribe(shareWith => {
      if (shareWith)
        configurationDetail.share(shareWith);
    });
  }
}
