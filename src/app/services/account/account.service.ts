import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Router } from 'angular2/router';
import { Observable } from 'rxjs';

import { CredentialService } from '../credential/credential.service';
import { ErrorService } from '../error/error.service';
import { ConfigService } from '../config/config.service';
import { Account } from './account';

@Injectable()
export class AccountService {

  credentials = null;

  constructor( public router: Router, public http: Http, public config: ConfigService, public errorService: ErrorService ) {

  }


  getAccount(credentialService: CredentialService) {

    console.log('Getting account for user ' + credentialService.getUsername());

    var headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
      this.config.getApiAddress() + 'account/' + credentialService.getUsername(),
      {
        headers: headers
      }
    )
    .map( res => <Account> res.json() )
    .catch( this.handleError );

  }

  private handleError( error: Response ) {
    return Observable.throw(error.json().error || 'Server error')
  }

}
