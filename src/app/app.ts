/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {LoggedInRouterOutlet} from './directives/logged-in-outlet';
import {RouterActive} from './directives/router-active';
import {About} from './components/about/about.component';
import {Repository} from './components/repository/repository.component';
import {Deployments} from './components/deployments/deployments.component';
import {Login} from './components/login/login.component';
import {Logout} from './components/login/logout.component';
import {Profile} from './components/profile/profile.component';
import {Authentication} from './services/authentication/authentication';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS, Authentication ],
  directives: [...ROUTER_DIRECTIVES, RouterActive, LoggedInRouterOutlet ],
  pipes: [],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: Deployments, name: 'Deployments' },
  { path: '/repository', component: Repository, name: 'Repository' },
  { path: '/deployments', component: Deployments, name: 'Deployments' },
  { path: '/about', component: About, name: 'About' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/logout', component: Logout, name: 'Logout' },
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/**', redirectTo: ['Deployments'] }
])
export class App {
  emblebiLogo = 'assets/img/embl-ebi-logo.png';
  name = 'TSI Cloud Portal';
  url = 'https://github.com/EMBL-EBI-TSI';

  constructor(public auth: Authentication) {
  }

}
