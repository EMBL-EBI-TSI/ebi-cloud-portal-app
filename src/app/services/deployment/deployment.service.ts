import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { Router } from 'angular2/router';

import { Deployment } from './deployment';
import { CredentialService } from '../credential/credential.service';
import { Application } from '../application/application';

@Injectable()
export class DeploymentService {

  credentials = null;

  constructor(public router: Router, public http: Http) {

  }


  getAll(credentialService: CredentialService) {
    console.log('[DeploymentService] Getting all deployments for user ' + credentialService.getUsername());
    
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
        'http://localhost:8080/deployment/',
      {
        headers: headers
      }
    )
      .map(res => <Deployment[]> res.json()._embedded.deploymentResourceList);
    
  }

  add(credentialService: CredentialService, application: Application) {
    console.log('[DeploymentService] Deploying application from repo ' 
      + application.repoUri + ' for user ' + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({ application });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8080/deployment/', body, options)
      .map(res => <Deployment>res.json());
  }

}
