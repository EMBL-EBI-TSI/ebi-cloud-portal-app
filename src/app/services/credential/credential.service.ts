import {Injectable} from 'angular2/core';

@Injectable()
export class CredentialService {


  constructor() {

  }

  getUsername() {
      return localStorage.getItem('username');
  }

  getPassword() {
      return localStorage.getItem('password');
  }

  setCredentials(username, password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  clearCredentials() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

}
