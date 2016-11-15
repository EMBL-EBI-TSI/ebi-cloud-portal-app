import { Component } from '@angular/core';
import { DeploymentsComponent } from 'ng2-cloud-portal-presentation-lib';
import { DeploymentStatusPipe } from './deployment-status.pipe';

@Component({
  selector: 'deployments-page',
  directives: [ DeploymentsComponent ],
  pipes: [ DeploymentStatusPipe ],
  styles: [require('./deployments-page.style.css')],
  template: require('./deployments-page.template.html')
})
export class DeploymentsPage {

}
