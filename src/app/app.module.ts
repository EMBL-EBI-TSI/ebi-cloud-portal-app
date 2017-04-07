import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ENV_TOKEN } from '../environment.base';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { JwtHelper } from 'angular2-jwt';

import { TokenService, AuthService, ConfigService,
        CredentialService, ErrorService } from 'ng2-cloud-portal-service-lib'

import { AppComponent } from './app.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const appRoutes: Routes = [
  { path: '', component: AboutPageComponent },
  { path: 'welcome', component: AboutPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'login', component: LoginPageComponent }
];

let activeConfig: ConfigService;
activeConfig = new ConfigService(environment.apiAddress, environment.authAddress);

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    LoginPageComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: ConfigService, useValue: activeConfig },
    TokenService,
    AuthService,
    CredentialService,
    ErrorService,
    JwtHelper ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
