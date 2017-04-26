import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { AddCloudProviderDialog } from '../../dialogs/add-cloud-provider-dialog/add-cloud-provider-dialog.component';
import { AddConfigurationDialog } from '../../dialogs/add-configuration-dialog/add-configuration-dialog.component';
import { ProfileComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog) { }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push(
      {label: 'Profile', route: 'profile'}
    );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  openAddDialog(profileComponent: ProfileComponent, configurationsTabGroup) {
    console.log("Selected tab is %O", configurationsTabGroup.selectedIndex);

    let dialogRef;
    switch (configurationsTabGroup.selectedIndex) {
      case 0:
        dialogRef = this.dialog.open(AddCloudProviderDialog);
        dialogRef.afterClosed().subscribe(
          cloudProviderParametersForm => {
            if (cloudProviderParametersForm)
              profileComponent.addCloudProviderParameters(cloudProviderParametersForm);
          }
        );
        break;
      case 1:
        dialogRef = this.dialog.open(AddConfigurationDialog);
        dialogRef.afterClosed().subscribe(
          configurationForm => {
            if (configurationForm)
              profileComponent.addConfiguration(configurationForm);
          }
        );
        break;
      case 2: 
        break;
      case 3:
        break;
    }

    
  }
}
