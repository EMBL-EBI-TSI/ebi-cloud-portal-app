import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ENV_TOKEN } from '../environment.base';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { JwtHelper } from 'angular2-jwt';

import { TokenService, AuthService, ConfigService,
        CredentialService, ErrorService, AccountService,
        ConfigurationService, CloudProviderParametersService, TeamService } from 'ng2-cloud-portal-service-lib'
import { ProfileComponent, ErrorComponent } from 'ng2-cloud-portal-presentation-lib';

import { AppComponent } from './app.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const appRoutes: Routes = [
  { path: '', component: AboutPageComponent },
  { path: 'welcome', component: AboutPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'error', component: ErrorPageComponent }
];

export function provideConfig() {
  return new ConfigService(environment.apiAddress, environment.authAddress);
}

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    ProfileComponent,
    ErrorPageComponent,
    ErrorComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: ConfigService, useFactory: provideConfig },
    TokenService,
    AuthService,
    CredentialService,
    ErrorService,
    AccountService,
    ConfigurationService,
    TeamService,
    CloudProviderParametersService,
    JwtHelper ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
