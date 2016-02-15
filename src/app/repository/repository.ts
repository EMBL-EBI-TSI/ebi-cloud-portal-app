import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import {Application} from '../services/application/application';
import {Credentials} from '../services/credentials/credentials';

@Component({
  selector: 'repository',
  providers: [
      Application,
      Credentials
  ],
  directives: [ ],
  pipes: [ ],
  styles: [ require('./repository.css') ],
  template: require('./repository.html')
})
export class Repository {
  // Set our default values
  repositoryData = { };

  // TypeScript public modifiers
  constructor(public router: Router, public application: Application, public credentials: Credentials) {
      this.repositoryData = null;
  }

  ngOnInit() {
    console.log('hello `Repository` component');
    this.application.getAll(this.credentials)
        .subscribe(
        data => {
            console.log('Applications data is %O', data);
            this.repositoryData = data;
        },
        err => {
            console.log(err);
            this.credentials.clearCredentials();
            this.router.parent.navigateByUrl('/login');
        },
        () => {
            console.log('Account data retrieval complete');
        }
        );
  }

  addDeployment( i: number) {
    console.log("Adding deployment for application " + i);
  }

}
