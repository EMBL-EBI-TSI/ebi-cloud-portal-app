import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'deployments-page',
  templateUrl: './deployments-page.component.html',
  styleUrls: ['./deployments-page.component.css']
})
export class DeploymentsPageComponent implements OnInit {

  statusFilters: string[] = [];
  hideDestroyed: boolean = false;

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
      this.statusFilters.push('DESTROYED');
    } 
  }

}
