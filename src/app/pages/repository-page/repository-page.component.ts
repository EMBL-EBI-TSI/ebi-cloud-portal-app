import { Component, OnInit, DoCheck } from '@angular/core';
import { CloudProviderParametersService } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { RepositoryComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit, DoCheck {

  robby = 'assets/img/Robby form@0.5x.png';
  cloudProviderFilters: string[] = ["AWS", "GCP", "OSTACK", "AZURE"];
  selectedOption: string;

  constructor(public cloudProviderParametersService: CloudProviderParametersService,
    public breadcrumbService: BreadcrumbService,
    public dialog: MdDialog) {
    this.updateFilters();
  }

  updateFilters() {
    if (this.cloudProviderParametersService.currentlySelectedCloudProviderParameters) {
      this.cloudProviderFilters = [this.cloudProviderParametersService.currentlySelectedCloudProviderParameters.cloudProvider];
    }
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push(
      { label: 'Repository', route: 'repository' }
    );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  ngDoCheck() {
    if (!(this.cloudProviderFilters.length == 1 &&
      this.cloudProviderFilters.includes(this.cloudProviderParametersService.currentlySelectedCloudProviderParameters.cloudProvider))) {
      this.updateFilters();
    }
  }

  openAddApplicationDialog(repo: RepositoryComponent) {
    let dialogRef = this.dialog.open(AddApplicationDialog);
    dialogRef.afterClosed().subscribe(repoUri => {
      if (repoUri)
        repo.addApplication({ repoUri: repoUri });
    });
  }
}

@Component({
  selector: 'add-application-dialog',
  templateUrl: './add-application-dialog.html',
})
export class AddApplicationDialog {
  robby = 'assets/img/Robby_form0.5x.png';

  constructor(public dialogRef: MdDialogRef<AddApplicationDialog>) { }
}