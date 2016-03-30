/*
 * Angular 2 decorators and services
 */
import { Component, OnInit } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { FORM_PROVIDERS } from 'angular2/common';

import { LoggedInRouterOutlet } from './directives/logged-in-outlet';
import { RouterActive } from './directives/router-active';
import { About } from './components/about/about.component';
import { Error } from './components/error/error.component';
import { Repository } from './components/repository/repository.component';
import { Volumes } from './components/volumes/volumes.component';
import { Deployments } from './components/deployments/deployments.component';
import { Login } from './components/login/login.component';
import { Profile } from './components/profile/profile.component';
import { CredentialService } from './services/credential/credential.service';
import { ConfigService } from './services/config/config.service';
import { DeploymentService } from './services/deployment/deployment.service';
import { ApplicationService } from './services/application/application.service';
import { VolumeInstanceService } from './services/volume-instance/volume-instance.service';
import { ErrorService } from './services/error/error.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [
    ...FORM_PROVIDERS,
    CredentialService,
    ErrorService,
    DeploymentService,
    ApplicationService,
    VolumeInstanceService
  ],
  directives: [...ROUTER_DIRECTIVES, RouterActive, LoggedInRouterOutlet ],
  pipes: [],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: Deployments, name: 'Deployments' },
  { path: '/repository', component: Repository, name: 'Repository' },
  { path: '/volumes', component: Volumes, name: 'Volumes' },
  { path: '/deployments', component: Deployments, name: 'Deployments' },
  { path: '/about', component: About, name: 'About' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/error', component: Error, name: 'Error' },
  { path: '/**', redirectTo: ['Deployments'] }
])
export class App {
  emblebiLogo = 'assets/img/embl-ebi-logo.png';
  name = 'TSI Cloud Portal';
  url = 'https://github.com/EMBL-EBI-TSI';

  constructor(public credentialService: CredentialService,
    public router: Router, public configService: ConfigService, public errorService: ErrorService) {

  }


  logOut(event) {
    event.preventDefault();
    this.credentialService.clearCredentials();
    this.router.navigateByUrl('/login');
  }

}
