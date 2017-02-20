import { Component } from '@angular/core';
import { RepositoryComponent } from 'ng2-cloud-portal-presentation-lib';
import { ApplicationCloudProviderPipe } from 'ng2-cloud-portal-presentation-lib';
import { CloudProviderParametersService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'repository-page',
  directives: [ RepositoryComponent ],
  pipes: [ ApplicationCloudProviderPipe ],
  styles: [require('./repository-page.style.css')],
  template: require('./repository-page.template.html')
})
export class RepositoryPage {

  robby = 'assets/img/Robby form@0.5x.png';
  cloudProviderFilters: string[] = ["AWS","GCP","OSTACK"];

  constructor(public cloudProviderParametersService: CloudProviderParametersService) {
    this.updateFilters();
  }

  updateFilters() {
    if (this.cloudProviderParametersService.currentlySelectedCloudProviderParameters) {
      this.cloudProviderFilters = [this.cloudProviderParametersService.currentlySelectedCloudProviderParameters.cloudProvider];
    }
  }
}
