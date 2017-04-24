import { Component, OnInit } from '@angular/core';
import { DeploymentsComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'deployments-page',
  templateUrl: './deployments-page.component.html',
  styleUrls: ['./deployments-page.component.css']
})
export class DeploymentsPageComponent implements OnInit {

  statusFilters: string[] = [];
  hideDestroyed: boolean = false;

  constructor() { }

  ngOnInit() {
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
