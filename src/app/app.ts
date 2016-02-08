/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {Repository} from './repository/repository';
import {Deployments} from './deployments/deployments';
import {Profile} from './profile/profile';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  styles: [`
    nav ul {
      display: inline;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 60px;
    }
    nav li {
      display: inline;
    }
    nav li.active {
      background-color: lightgray;
    }
  `],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/repository', component: Repository, name: 'Repository' },
  { path: '/deployments', component: Deployments, name: 'Deployments' },
  // Async load a component using Webpack's require with es6-promise-loader
  { path: '/about', loader: () => require('./about/about')('About'), name: 'About' },
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  emblebiLogo = 'assets/img/embl-ebi-logo.png';
  name = 'TSI Cloud Portal';
  url = 'https://github.com/EMBL-EBI-TSI';
  constructor() {

  }
}
