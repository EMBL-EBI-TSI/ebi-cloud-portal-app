import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import {Deployment} from '../services/deployment/deployment.service';
import {Credentials} from '../services/credentials/credentials.service';

@Component({
  selector: 'deployments',
  providers: [ Deployment, Credentials ],
  styles: [ require('./deployments.component.css') ],
  template: require('./deployments.component.html')
})
export class Deployments {
  // Set our default values
  deployments = {};

  // TypeScript public modifiers
  constructor(public router: Router, public deployment: Deployment, public credentials: Credentials) {
    this.deployments = null;

  }

  ngOnInit() {
    console.log('hello `Deployments` component');
    this.deployment.getAll(this.credentials)
        .subscribe(
          deployments => {
            console.log('Deployments data is %O', deployments);
              this.deployments = deployments;
          },
          err => {
              console.log(err);
              this.credentials.clearCredentials();
              this.router.parent.navigateByUrl('/login');
          },
          () => {
              console.log('Deployment data retrieval complete');
          }
        );
  }

  destroyDeployment(reference: string) {
      console.log("Destroying deployment " + reference);
  }

}
