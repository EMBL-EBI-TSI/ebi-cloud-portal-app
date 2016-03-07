import {Injectable} from 'angular2/core';

@Injectable()
export class CredentialService {


  constructor() {
    console.log('[CredentialService] constructor called');
  }

  getUsername() {
      return localStorage.getItem('username');
  }

  getPassword() {
      return localStorage.getItem('password');
  }

  setCredentials(username, password) {
    console.log('Username is ' + username);

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  clearCredentials() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

}
