import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Application } from './application';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ApplicationService {

  credentials = null;

  constructor(public http: Http, public config: ConfigService) {
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
      this.config.getApiAddress() + 'application/',
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
        this.config.getApiAddress() + 'application/' + application.name,
        {
            headers: headers
        }
      )
      .map(res => <Application>res.json())
      .catch(this.handleError);

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
      .map(res => <Application>res.json())
      .catch(this.handleError);
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
    .map(res => res.status)
    .catch(this.handleError);
  }

  private processResult(res: Response) {
    console.log('[ApplicationService] Processing response %O', res);
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
    console.error('[ApplicationService] error %O', error);
    return Observable.throw(error.json()[0].message || 'Server error');
  }

}
