import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-cloud-provider-parameters-page',
  templateUrl: './cloud-provider-parameters-page.component.html',
  styleUrls: ['./cloud-provider-parameters-page.component.css']
})
export class CloudProviderParametersPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService, private _route: ActivatedRoute) {
    
  }

  ngOnInit() {
    let providerName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push( {label:'Profile', route:'profile'} );
    this.breadcrumbService.breadcrumb.push( {label:providerName, route:'cloudprovider/'+providerName} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }


}
