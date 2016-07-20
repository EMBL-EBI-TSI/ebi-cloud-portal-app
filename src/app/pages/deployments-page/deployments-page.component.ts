import { Component } from '@angular/core';
import { DeploymentsComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'deployments-page',
  directives: [ DeploymentsComponent ],
  styles: [require('./deployments-page.style.css')],
  template: require('./deployments-page.template.html')
})
export class DeploymentsPage {

}
