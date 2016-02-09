/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {About} from './about/about';
import {Repository} from './repository/repository';
import {Deployments} from './deployments/deployments';
import {Login} from './login/login';
import {Logout} from './login/logout';
import {Authentication} from './login/services/authentication';

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
  { path: '/', component: Home, name: 'Index' },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/repository', component: Repository, name: 'Repository' },
  { path: '/deployments', component: Deployments, name: 'Deployments' },
  { path: '/about', component: About, name: 'About' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/logout', component: Logout, name: 'Logout' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  emblebiLogo = 'assets/img/embl-ebi-logo.png';
  name = 'TSI Cloud Portal';
  url = 'https://github.com/EMBL-EBI-TSI';

  constructor(public router: Router, public auth: Authentication) {
  }

}
