import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import { Router } from 'angular2/router';
import { Observable }     from 'rxjs/Observable';

import { VolumeInstance } from './volume-instance';
import { CredentialService } from '../credential/credential.service';
import { ConfigService } from '../config/config.service';
import { VolumeSetup } from '../volume-setup/volume-setup';

@Injectable()
export class VolumeInstanceService {

  credentials = null;

  constructor(public router: Router, public http: Http, public config: ConfigService) {

  }


  getAll(credentialService: CredentialService) {
    console.log('[VolumeInstanceService] Getting all volume instnaces for user '
        + credentialService.getUsername());

    var headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
      this.config.getApiAddress() + 'volumeinstance/',
      {
        headers: headers
      }
    )
    .map(res => this.processResult(res))
    .catch(this.handleError);

  }

  add(credentialService: CredentialService, volumeSetup: VolumeSetup) {
    console.log('[VolumeInstanceService] Deploying volume with repo '
      + volumeSetup.repoUri + ' for user ' + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({ volumeSetup });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.config.getApiAddress() + 'volumeinstance/', body, options)
      .map(res => <VolumeInstance>res.json())
      .catch(this.handleError);
  }

  delete(credentialService: CredentialService, volumeInstance: VolumeInstance) {
    console.log('[VolumeInstanceService] deleting volume instnace with ref '
      + volumeInstance.reference + ' for user ' + credentialService.getUsername());

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.http.delete(
      this.config.getApiAddress() + 'volumeinstance/' + volumeInstance.reference,
        options)
      .map(res => res.status)
      .catch(this.handleError);
  }

  private processResult(res: Response) {
    let jsonRes = res.json();
    if (jsonRes._embedded) {
      return <VolumeInstance[]>jsonRes._embedded.volumeInstanceResourceList;
    } else {
      return [];
    }
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error('[VolumeInstanceService] error ' + error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
