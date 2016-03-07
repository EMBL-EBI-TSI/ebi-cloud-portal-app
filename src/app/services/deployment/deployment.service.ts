import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import { Router } from 'angular2/router';
import { Observable }     from 'rxjs/Observable';

import { Deployment } from './deployment';
import { DeploymentStatus } from './deployment-status';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { Application } from '../application/application';

@Injectable()
export class DeploymentService {

  credentials = null;

  constructor( public router: Router, public http: Http, public config: ConfigService ) {

  }


  getAll(credentialService: CredentialService) {
    console.log('[DeploymentService] Getting all deployments for user '
        + credentialService.getUsername());

    var headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
        this.config.getApiAddress() + 'deployment/',
        {
          headers: headers
        }
      )
      .map(res => this.processResult(res))
      .catch(this.handleError);

  }

  add(credentialService: CredentialService, application: Application, volumeReference: string) {
    console.log('[DeploymentService] Deploying application with repo '
      + application.repoUri
      + ' for user ' + credentialService.getUsername()
      + ' and attached volume ' + volumeReference);

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify(
      {
        'application': {
          'repoUri' : application.repoUri,
          'name' : application.name
        },
        'volumeInstanceReference' : volumeReference
      }
    );
    console.log('[DeploymentService] body is ' + body);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.config.getApiAddress() + 'deployment/', body, options)
      .map(res => <Deployment>res.json())
      .catch(this.handleError);
  }

  delete(credentialService: CredentialService, deployment: Deployment) {
    console.log('[DeploymentService] deleting application with ref '
      + deployment.reference + ' for user ' + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.http.delete(
        this.config.getApiAddress()
        + 'deployment/'
        + deployment.reference, options)
      .map(res => res.status)
      .catch(this.handleError);
  }

  // pollStatus(deploymentReference: string, interval: number) {
  //   return Observable.interval(interval).flatMap(
  //     () => this.http.get(this.config.getApiAddress() 
  // + '/deployment/' + deploymentReference + 'status')
  //   ).map(res => <DeploymentStatus>res.json())
  // }

  private processResult(res: Response) {
    let jsonRes = res.json();
    if (jsonRes._embedded) {
      return <Deployment[]>jsonRes._embedded.deploymentResourceList;
    } else {
      return [];
    }
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error('[DeploymentService] error ' + error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
