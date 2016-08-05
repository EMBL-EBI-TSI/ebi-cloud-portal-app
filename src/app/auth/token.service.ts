import { Injectable } from '@angular/core';
import { JwtToken } from './jwt.token';

@Injectable()
export class TokenService {

  constructor() {

  }

  public setToken(token: JwtToken) {
    localStorage.setItem('token', token.token);
  }

  public getToken(): JwtToken {
    return localStorage.getItem('token');
  }

  public clearToken() {
    localStorage.removeItem('token');
  }

}