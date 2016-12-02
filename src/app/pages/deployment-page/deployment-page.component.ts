import { Component } from '@angular/core';

import { DeploymentComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'deployments-page',
  directives: [ DeploymentComponent ],
  styles: [require('./deployment-page.style.css')],
  template: require('./deployment-page.template.html')
})
export class DeploymentPage {

}
