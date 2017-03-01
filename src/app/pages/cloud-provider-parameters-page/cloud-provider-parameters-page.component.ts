import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CloudProviderParametersComponent } from 'ng2-cloud-portal-presentation-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'cloud-provider-parameters-page',
  directives: [ CloudProviderParametersComponent ],
  styles: [require('./cloud-provider-parameters-page.style.css')],
  template: require('./cloud-provider-parameters-page.template.html')
})
export class CloudProviderParametersPage {

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
