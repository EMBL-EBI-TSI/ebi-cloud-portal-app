import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

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

  switchDestroyed() {
    this.hideDestroyed = !this.hideDestroyed;
    this.updateFilters();
  }

  updateFilters() {
    this.statusFilters = [];
    if (this.hideDestroyed) {
      this.statusFilters.push('DESTROYED', 'DESTROYING_FAILED');
    } 
  }

  fromTimeStampToDateAndTime(timestamp: number) {
    let t = new Date( timestamp );
    let formatted = t.toISOString().replace("T"," ");
    let res = formatted.substring(0,formatted.indexOf("."));
    return res;
  }
  
}
