import { Component } from '@angular/core';
import { DeploymentsComponent, DeploymentStatusPipe } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'deployments-page',
  directives: [ DeploymentsComponent ],
  pipes: [ DeploymentStatusPipe ],
  styles: [require('./deployments-page.style.css')],
  template: require('./deployments-page.template.html')
})
export class DeploymentsPage {

  statusFilters: string[] = [];
  hideDestroyed: boolean = false;

  switchDestroyed() {
    this.hideDestroyed = !this.hideDestroyed;
    this.updateFilters();
  }
  updateFilters() {
    this.statusFilters = [];
    if (this.hideDestroyed) {
      this.statusFilters.push('DESTROYED');
    } 
  }
}
