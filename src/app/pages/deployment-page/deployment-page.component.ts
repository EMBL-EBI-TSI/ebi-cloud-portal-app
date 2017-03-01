import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeploymentComponent } from 'ng2-cloud-portal-presentation-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'deployments-page',
  directives: [ DeploymentComponent ],
  styles: [require('./deployment-page.style.css')],
  template: require('./deployment-page.template.html')
})
export class DeploymentPage {

  constructor(public breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute) {
    
  }

  ngOnInit() {
    let deploymentRef = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push( {label:'Deployments', route:'deployments'} );
    this.breadcrumbService.breadcrumb.push( {label:deploymentRef, route:'deployments/'+deploymentRef} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }
  

}
