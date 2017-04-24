import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';


@Component({
  selector: 'app-deployment-page',
  templateUrl: './deployment-page.component.html',
  styleUrls: ['./deployment-page.component.css']
})
export class DeploymentPageComponent implements OnInit {

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
