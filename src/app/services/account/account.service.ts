import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';

import {Credentials} from '../credentials/credentials.service';

@Injectable()
export class Account {

  credentials = null;

  constructor(public router: Router, public http: Http) {

  }


  getAccount(credentials: Credentials) {
    console.log('Getting account for user ' + credentials.getUsername());
    
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(credentials.getUsername() + ':' + credentials.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
      'http://localhost:8080/account/' + credentials.getUsername(),
      {
        headers: headers
      }
    )
    .map(res => res.json());
    
  }


}
