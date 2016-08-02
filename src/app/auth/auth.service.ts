import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ErrorService } from 'ng2-cloud-portal-service-lib';
import { ConfigService } from 'ng2-cloud-portal-service-lib';
import { JwtToken } from './jwt.token';

import { Account } from 'ng2-cloud-portal-service-lib';


@Injectable()
export class AuthService {

  constructor(private _http: Http, 
    private _configService: ConfigService, private _errorService: ErrorService) {

  }

  getToken(username: string, password: string): Observable<JwtToken> {
    console.log('[AuthService] Getting jwt token for user ' + username);

    let headers = new Headers();
    headers.append('Authorization', 'Basic '
      + btoa(username + ':' + password));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this._http.get(
      this._configService.getApiAddress() + 'auth',
      {
        headers: headers
      }
    )
      .map(res => <JwtToken>{ token: res.text() } )
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.dir('[AuthService] got error ', error);
    return Observable.throw(error.json()[0].message || 'Server error');
  }

  public getAccount(username: string, token: JwtToken): Observable<Account> {
    console.log('[AuthService] Getting account for ' + username);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token.token);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this._http.get(
      this._configService.getApiAddress() + 'account/' + username,
      {
        headers: headers
      }
    )
      .map(res => <Account>res.json() )
      .catch(this.handleError);
  }
}