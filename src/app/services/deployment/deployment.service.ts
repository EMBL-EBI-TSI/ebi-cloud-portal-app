import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';

import { Deployment } from './deployment';
import { CredentialService } from '../credential/credential.service';

@Injectable()
export class DeploymentService {

  credentials = null;

  constructor(public router: Router, public http: Http) {

  }


  getAll(credentialService: CredentialService) {
    console.log('Getting all deployments for user ' + credentialService.getUsername());
    
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

  getById(credentialService: CredentialService, applicationId: string) {
    console.log('Getting application ' + applicationId + ' for user ' + credentialService.getUsername());

      var headers = new Headers();
      headers.append('Authorization', 'Basic ' + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      return this.http.get(
          'http://localhost:8080/deployment/' + applicationId,
          {
              headers: headers
          }
      )
        .map(res => <Deployment> res.json());

  }

}
