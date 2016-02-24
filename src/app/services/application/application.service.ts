import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { Router } from 'angular2/router';

import { Application } from './application';
import { CredentialService } from '../credential/credential.service';

@Injectable()
export class ApplicationService {

  credentials = null;

  constructor(public router: Router, public http: Http) {

  }


  getAll(credentialService: CredentialService) {
    console.log('[ApplicationService] Getting all applications for user '
        + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
      'http://localhost:8080/application/',
      {
        headers: headers
      }
    )
      .map(res => <Application[]>res.json()._embedded.applicationResourceList);
  }

  get(credentialService: CredentialService, application: Application) {
      console.log('[ApplicationService] Getting application ' + application.name
        + ' for user ' + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
        'http://localhost:8080/application/' + application.name,
        {
            headers: headers
        }
    )
        .map(res => <Application> res.json());

  }

  add(credentialService: CredentialService, repoUri: string) {
    console.log('[ApplicationService] Adding application from repo at ' + repoUri);

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({ repoUri });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8080/application/', body, options)
      .map(res => <Application> res.json());
  }

  delete(credentialService: CredentialService, application: Application) {
      console.log('[ApplicationService] removing application  '
          + application.name + ' for user ' + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.http.delete('http://localhost:8080/application/' + application.name, options)
        .map(res => res.status);
  }

}
