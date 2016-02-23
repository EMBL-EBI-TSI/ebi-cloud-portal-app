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

  getById(credentialService: CredentialService, applicationId: string) {
    console.log('[ApplicationService] Getting application ' + applicationId
        + ' for user ' + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
        'http://localhost:8080/application/' + applicationId,
        {
            headers: headers
        }
    )
        .map(res => <Application> res.json());

  }

  add(credentialService: CredentialService, repoUri: string) {
    console.log('[ApplicationService] Adding repo at ' + repoUri);

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

}
