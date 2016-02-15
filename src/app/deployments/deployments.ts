import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import {Deployment} from '../services/deployment/deployment';
import {Credentials} from '../services/credentials/credentials';

@Component({
  selector: 'deployments',
  providers: [ Deployment, Credentials ],
  styles: [ require('./deployments.css') ],
  template: require('./deployments.html')
})
export class Deployments {
  // Set our default values
    deploymentsData = {};

    // TypeScript public modifiers
    constructor(public router: Router, public deployment: Deployment, public credentials: Credentials) {
        this.deploymentsData = null;

    }

  ngOnInit() {
    console.log('hello `Deployments` component');
    this.deployment.getAll(this.credentials)
        .subscribe(
        data => {
            console.log('Deployments data is %O', data);
            this.deploymentsData = data;
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
