import { Component, OnInit, DoCheck } from '@angular/core';
import { CloudProviderParametersService } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { MdDialog } from '@angular/material';
import { RepositoryComponent } from 'ng2-cloud-portal-presentation-lib';
import { AddRepoDialog } from '../../dialogs/add-repo-dialog/add-repo-dialog.component';

@Component({
  selector: 'repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit, DoCheck {

  cloudProviderFilters: string[] = ["AWS", "GCP", "OSTACK", "AZURE"];

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
    let dialogRef = this.dialog.open(AddRepoDialog);
    dialogRef.afterClosed().subscribe(repoUri => {
      if (repoUri)
        repo.addApplication({ repoUri: repoUri });
    });
  }
}
