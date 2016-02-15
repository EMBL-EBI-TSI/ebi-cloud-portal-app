import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';

import {Credentials} from '../credentials/credentials';

@Injectable()
export class Application {

  credentials = null;

  constructor(public router: Router, public http: Http) {

  }


  getAll(credentials: Credentials) {
    console.log('Getting all applications for user ' + credentials.getUsername());
    
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(credentials.getUsername() + ':' + credentials.getPassword()));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
      'http://localhost:8080/application/',
      {
        headers: headers
      }
    )
    .map(res => res.json());
    
  }

  getById(credentials: Credentials, applicationId: string) {
      console.log('Getting application ' + applicationId + ' for user ' + credentials.getUsername());

      var headers = new Headers();
      headers.append('Authorization', 'Basic ' + btoa(credentials.getUsername() + ':' + credentials.getPassword()));
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      return this.http.get(
          'http://localhost:8080/application/' + applicationId,
          {
              headers: headers
          }
      )
          .map(res => res.json());

  }

}
