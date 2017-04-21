import { Component, OnInit, DoCheck } from '@angular/core';
import { CloudProviderParametersService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.css']
})
export class RepositoryPageComponent implements OnInit, DoCheck {

  robby = 'assets/img/Robby form@0.5x.png';
  cloudProviderFilters: string[] = ["AWS","GCP","OSTACK","AZURE"];

  constructor(public cloudProviderParametersService: CloudProviderParametersService) {
    this.updateFilters();
  }

  updateFilters() {
    if (this.cloudProviderParametersService.currentlySelectedCloudProviderParameters) {
      this.cloudProviderFilters = [this.cloudProviderParametersService.currentlySelectedCloudProviderParameters.cloudProvider];
    }
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  ngDoCheck() {
    if (!(this.cloudProviderFilters.length==1 &&
      this.cloudProviderFilters.includes(this.cloudProviderParametersService.currentlySelectedCloudProviderParameters.cloudProvider))) {
      this.updateFilters();
    }
  }

}
