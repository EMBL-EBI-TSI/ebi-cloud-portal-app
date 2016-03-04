import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import { Router } from 'angular2/router';
import { Observable }     from 'rxjs/Observable';

import { Application } from './application';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ApplicationService {

  credentials = null;

  constructor(public router: Router, public http: Http, public config: ConfigService) {

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
      this.config.getApiAddress() + '/application/',
      {
        headers: headers
      }
    )
    .map(res => this.processResult(res))
    .catch(this.handleError);
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
      this.config.getApiAddress() + '/application/' + application.name,
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

    return this.http.post(this.config.getApiAddress() + 'application/', body, options)
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

    return this.http.delete(
      this.config.getApiAddress()
      + 'application/'
      + application.name, options)
    .map(res => res.status);
  }

  private processResult(res: Response) {
    let jsonRes = res.json();
    if (jsonRes._embedded) {
      return <Application[]>jsonRes._embedded.applicationResourceList;
    } else {
      return [];
    }
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error('[ApplicationService] error ' + error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
