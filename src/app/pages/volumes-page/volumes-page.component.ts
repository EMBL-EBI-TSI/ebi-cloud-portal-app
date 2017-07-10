import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { VolumesComponent } from 'ng2-cloud-portal-presentation-lib';
import { AddRepoDialog } from '../../dialogs/add-repo-dialog/add-repo-dialog.component';

@Component({
  selector: 'volumes-page',
  templateUrl: './volumes-page.component.html',
  styleUrls: ['./volumes-page.component.css']
})
export class VolumesPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog) {  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push(
      {label: 'Volumes', route: 'volumes'}
    );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  openAddVolumeSetupDialog(volumesComponent: VolumesComponent) {
    let dialogRef = this.dialog.open(AddRepoDialog);
    dialogRef.afterClosed().subscribe(repoUri => {
      if (repoUri)
        volumesComponent.addVolumeSetup({ repoUri: repoUri });
    });
  }
}