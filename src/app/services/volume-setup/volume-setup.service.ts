import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import { Router } from 'angular2/router';
import { Observable }     from 'rxjs/Observable';

import { VolumeSetup } from './volume-setup';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class VolumeSetupService {

  credentials = null;

  constructor(public router: Router, public http: Http, public config: ConfigService) {

  }


  getAll(credentialService: CredentialService) {
    console.log('[VolumeSetupService] Getting all volume setups for user '
        + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
      this.config.getApiAddress() + 'volumesetup/',
      {
        headers: headers
      }
    )
    .map(res => this.processResult(res))
    .catch(this.handleError);
  }

  getById(credentialService: CredentialService, volumeSetupId: string) {
    console.log('[VolumeSetupService] Getting volume setup ' + volumeSetupId
        + ' for user ' + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
      this.config.getApiAddress() + 'volumesetup/' + volumeSetupId,
        {
            headers: headers
        }
    )
        .map(res => <VolumeSetup> res.json());

  }

  add(credentialService: CredentialService, repoUri: string) {
    console.log('[VolumeSetupService] Adding repo at ' + repoUri);

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({ repoUri });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.config.getApiAddress() + 'volumesetup/', body, options)
      .map(res => <VolumeSetup> res.json());
  }

  delete(credentialService: CredentialService, volumeSetup: VolumeSetup) {
    console.log('[VolumeSetupService] removing application  '
      + volumeSetup.name + ' for user ' + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
      + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.http.delete(
      this.config.getApiAddress()
      + '/volumesetup/'
      + volumeSetup.name, options
    ).map(res => res.status);
  }

  private processResult(res: Response) {
    let jsonRes = res.json();
    if (jsonRes._embedded) {
      return <VolumeSetup[]>jsonRes._embedded.volumeSetupResourceList;
    } else {
      return [];
    }
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error('[VolumeSetupService] error ' + error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
