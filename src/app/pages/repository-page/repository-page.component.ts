import { Component, OnInit, DoCheck } from '@angular/core';
import { CloudProviderParametersService } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit, DoCheck {

  robby = 'assets/img/Robby form@0.5x.png';
  cloudProviderFilters: string[] = ["AWS","GCP","OSTACK","AZURE"];

  constructor(public cloudProviderParametersService: CloudProviderParametersService,
              public breadcrumbService: BreadcrumbService) {
    this.updateFilters();
  }

  updateFilters() {
    if (this.cloudProviderParametersService.currentlySelectedCloudProviderParameters) {
      this.cloudProviderFilters = [this.cloudProviderParametersService.currentlySelectedCloudProviderParameters.cloudProvider];
    }
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push(
      {label: 'Repository', route: 'repository'}
    );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  ngDoCheck() {
    if (!(this.cloudProviderFilters.length==1 &&
      this.cloudProviderFilters.includes(this.cloudProviderParametersService.currentlySelectedCloudProviderParameters.cloudProvider))) {
      this.updateFilters();
    }
  }

}
