import { Component } from '@angular/core';
import { RepositoryComponent } from 'ng2-cloud-portal-presentation-lib';
import { ApplicationCloudProviderPipe } from 'ng2-cloud-portal-presentation-lib';
import { CloudProviderParametersService } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'repository-page',
  directives: [ RepositoryComponent ],
  pipes: [ ApplicationCloudProviderPipe ],
  styles: [require('./repository-page.style.css')],
  template: require('./repository-page.template.html')
})
export class RepositoryPage {

  robby = 'assets/img/Robby form@0.5x.png';
  cloudProviderFilters: string[] = ["AWS","GCP","OSTACK","AZURE"];

  constructor(public cloudProviderParametersService: CloudProviderParametersService, public breadcrumbService: BreadcrumbService) {
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
}
