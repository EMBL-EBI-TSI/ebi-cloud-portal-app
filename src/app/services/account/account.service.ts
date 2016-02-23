import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';

import { CredentialService } from '../credential/credential.service';
import { Account } from './account';

@Injectable()
export class AccountService {

  credentials = null;

  constructor(public router: Router, public http: Http) {

  }


  getAccount(credentialService: CredentialService) {

    console.log('Getting account for user ' + credentialService.getUsername());

    var headers = new Headers();
    headers.append('Authorization', 'Basic '
        + btoa(credentialService.getUsername() + ':' + credentialService.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
      'http://localhost:8080/account/' + credentialService.getUsername(),
      {
        headers: headers
      }
    )
    .map(res => <Account> res.json());

  }


}
