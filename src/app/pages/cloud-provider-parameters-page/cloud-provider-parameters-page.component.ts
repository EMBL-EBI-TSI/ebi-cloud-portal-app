import { Component } from '@angular/core';
import { CloudProviderParametersComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'profile-page',
  directives: [ CloudProviderParametersComponent ],
  styles: [require('./cloud-provider-parameters-page.style.css')],
  template: require('./cloud-provider-parameters-page.template.html')
})
export class CloudProviderParametersPage {

}
