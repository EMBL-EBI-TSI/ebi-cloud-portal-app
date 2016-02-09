import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';

@Injectable()
export class Authentication {

  currentUser = {};

  constructor(public router: Router, public http: Http) {
    this.currentUser = localStorage.getItem('username');
  }

  isAuth() {
    return !!this.currentUser;
  }

  getUser() {
    return this.currentUser;
  }

  login(username, password) {

    var headers = new Headers();
    headers.append('Authorization', "Basic " + btoa(username + ":" + password));
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.get(
      'http://localhost:8080/account/' + username, 
      {
        headers: headers
      }
    )
    .map(res => res.json())
    .subscribe(
        data => {
            this.setCredentials(data, username, password);
            this.router.parent.navigateByUrl('/home');
        },
        err => {
            console.log(err);
            this.router.parent.navigateByUrl('/login');
        },
        () => {
            console.log('Authentication Complete');
        }
    );
  }

  setCredentials(userData, username, password) {
    console.log("User data is %O", userData);
    if(userData) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      this.currentUser = username;
    }
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.currentUser = null;
  }

}
