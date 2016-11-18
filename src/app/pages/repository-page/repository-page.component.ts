import { Component } from '@angular/core';
import { RepositoryComponent } from 'ng2-cloud-portal-presentation-lib';
import { ApplicationCloudProviderPipe } from './application-cloud-provider.pipe';

@Component({
  selector: 'repository-page',
  directives: [ RepositoryComponent ],
  pipes: [ ApplicationCloudProviderPipe ],
  styles: [require('./repository-page.style.css')],
  template: require('./repository-page.template.html')
})
export class RepositoryPage {

  cloudProviderFilters: string[] = ["AWS","GCP","OSTACK"];
  showAws: boolean = true;
  showOstack: boolean = true;
  showGcp: boolean = true;

  RepositoryPage() {
    this.updateFilters();
  }

  switchAws() {
    this.showAws = !this.showAws;
    this.updateFilters();
  }

  switchOstack() {
    this.showOstack = !this.showOstack;
    this.updateFilters();
  }

  switchGcp() {
    this.showGcp = !this.showGcp;
    this.updateFilters();
  }

  updateFilters() {
    this.cloudProviderFilters = [];
    if (this.showAws) {
      this.cloudProviderFilters.push('AWS');
    } 
    if (this.showOstack) {
      this.cloudProviderFilters.push('OSTACK');
    } 
    if (this.showGcp) {
      this.cloudProviderFilters.push('GCP');
    } 
  }
}
