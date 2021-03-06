import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { DeploymentsComponent } from 'ng2-cloud-portal-presentation-lib/dist';

@Component({
  selector: 'deployments-page',
  templateUrl: './deployments-page.component.html',
  styleUrls: ['./deployments-page.component.css']
})
export class DeploymentsPageComponent implements OnInit {

  statusFilters: string[] = ['DESTROYED', 'DESTROYING_FAILED'];
  hideDestroyed: boolean = true;

  constructor(public breadcrumbService: BreadcrumbService) {

  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push( {label:'Deployments', route:'deployments'} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  switchDestroyed(deploymentsComponent: DeploymentsComponent) {
    console.log("Hide Destroye in app switch destroyed" + this.hideDestroyed);
    this.hideDestroyed = !this.hideDestroyed;
    this.updateFilters(deploymentsComponent);
  }

  updateFilters(deploymentsComponent: DeploymentsComponent) {
    this.statusFilters = [];
    if (this.hideDestroyed) {
      this.statusFilters.push('DESTROYED', 'DESTROYING_FAILED');
    }
    deploymentsComponent.hideDestroyed = this.hideDestroyed;
    console.log("Hide Destroye in app load deployments" + this.hideDestroyed);
    deploymentsComponent.loadDeployments();
  }

  fromTimeStampToDateAndTime(timestamp: number) {
    let t = new Date( timestamp );
    let formatted = t.toISOString().replace("T"," ");
    let res = formatted.substring(0,formatted.indexOf("."));
    return res;
  }

}
