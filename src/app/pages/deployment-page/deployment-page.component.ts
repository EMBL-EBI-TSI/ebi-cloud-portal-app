import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Convert from 'ansi-to-html';

@Component({
  selector: 'app-deployment-page',
  templateUrl: './deployment-page.component.html',
  styleUrls: ['./deployment-page.component.css']
})
export class DeploymentPageComponent implements OnInit {

  convert = new Convert({
    newline: true, 
    stream: true });

  constructor(public breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute,
    private cdRef:ChangeDetectorRef) {
    
  }

  ngOnInit() {
    let deploymentRef = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push( {label:'Deployments', route:'deployments'} );
    this.breadcrumbService.breadcrumb.push( {label:deploymentRef, route:'deployments/'+deploymentRef} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

  ansiToHtml(ansi: string) {
    return this.convert.toHtml(ansi);
  }

  ngAfterViewChecked(){
  this.cdRef.detectChanges();
}

}
