import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ENV_TOKEN } from '../environment.base';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdButtonModule, MdCardModule, MdCoreModule, MdSelectModule,
  MdInputModule, MdMenuModule, MdSidenavModule, MdAutocompleteModule, MdDialogModule,
  MdListModule, MdTabsModule, MdChipsModule, MdToolbarModule, MdIconModule,
  MdProgressSpinnerModule, MdProgressBarModule, MdTooltipModule } from '@angular/material';
import 'hammerjs';
import { JwtHelper } from 'angular2-jwt';

import { TokenService, AuthService, ConfigService,
        CredentialService, ErrorService, AccountService,
        ConfigurationService, CloudProviderParametersService,
        ApplicationService, VolumeInstanceService, VolumeSetupService,
        TeamService, DeploymentService } from 'ng2-cloud-portal-service-lib'
import { ProfileComponent, CloudProviderParametersComponent, RepositoryComponent,
        ApplicationComponent, ErrorComponent, ApplicationCloudProviderPipe,
        TeamComponent, DeploymentsComponent, DeploymentComponent,
        VolumesComponent, DeploymentStatusPipe, ConfigurationFilterPipe } from 'ng2-cloud-portal-presentation-lib';

import { AppComponent } from './app.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RepositoryPageComponent } from './pages/repository-page/repository-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { DeploymentsPageComponent } from './pages/deployments-page/deployments-page.component';
import { VolumesPageComponent } from './pages/volumes-page/volumes-page.component';
import { DeploymentPageComponent } from './pages/deployment-page/deployment-page.component';
import { ApplicationPageComponent } from './pages/application-page/application-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { CloudProviderParametersPageComponent } from './pages/cloud-provider-parameters-page/cloud-provider-parameters-page.component';
import { DocsPageComponent } from './pages/docs-page/docs-page.component';
import { VolumeSetupPageComponent } from './pages/volume-setup-page/volume-setup-page.component';
import { VolumeInstancePageComponent } from './pages/volume-instance-page/volume-instance-page.component';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';
import { ShareDialog } from './dialogs/share-dialog/share-dialog.component';
import { AddRepoDialog } from './dialogs/add-repo-dialog/add-repo-dialog.component';
import { AddCloudProviderDialog } from './dialogs/add-cloud-provider-dialog/add-cloud-provider-dialog.component';
import { AddConfigurationDialog } from './dialogs/add-configuration-dialog/add-configuration-dialog.component';
import { AddDeploymentParametersDialog } from './dialogs/add-deployment-parameters-dialog/add-deployment-parameters-dialog.component';
import { AddTeamDialog } from './dialogs/add-team-dialog/add-team-dialog.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { ConfigurationComponent, DeploymentParametersComponent } from 'ng2-cloud-portal-presentation-lib';
import { DeploymentParametersPageComponent } from './pages/deployment-parameters-page/deployment-parameters-page.component';

const appRoutes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'repository', component: RepositoryPageComponent },
    { path: 'repository/:id', component: ApplicationPageComponent },
    { path: 'repository/shared/:id', component: ApplicationPageComponent },
    { path: 'cloudprovider/shared/:id', component: CloudProviderParametersPageComponent },
    { path: 'cloudprovider/:id', component: CloudProviderParametersPageComponent },
    { path: 'configuration/shared/:id', component: ConfigurationPageComponent },
    { path: 'configuration/:id', component: ConfigurationPageComponent},
    { path: 'configuration/deploymentparameters/shared/:id', component: DeploymentParametersPageComponent },
    { path: 'configuration/deploymentparameters/:id', component: DeploymentParametersPageComponent},
    { path: 'team/:id', component: TeamPageComponent },
    { path: 'deployments/:id', component: DeploymentPageComponent },
    { path: 'deployments', component: DeploymentsPageComponent },
    { path: 'volumes', component: VolumesPageComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'docs', component: DocsPageComponent },
    { path: '**', component: WelcomePageComponent },
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
    ErrorComponent,
    RepositoryPageComponent,
    RepositoryComponent,
    WelcomePageComponent,
    DeploymentsPageComponent,
    DeploymentsComponent,    
    VolumesPageComponent,
    VolumesComponent,
    DeploymentPageComponent,
    DeploymentComponent,    
    ApplicationPageComponent,
    ApplicationComponent,
    TeamPageComponent,
    TeamComponent,
    CloudProviderParametersPageComponent,
    CloudProviderParametersComponent,
    ConfigurationPageComponent,
    ConfigurationComponent, 
    DeploymentParametersComponent,
    DeploymentParametersPageComponent,
    DocsPageComponent,
    ApplicationCloudProviderPipe,
    ConfigurationFilterPipe,
    DeploymentStatusPipe,
    VolumeSetupPageComponent,
    VolumeInstancePageComponent,
    ShareDialog,
    AddRepoDialog,
    AddCloudProviderDialog,
    AddConfigurationDialog,
    AddDeploymentParametersDialog,
    AddTeamDialog
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule, MdButtonModule, MdCardModule, MdCoreModule, MdSelectModule,
    MdInputModule, MdMenuModule, MdSidenavModule, MdAutocompleteModule, MdDialogModule,
    MdListModule, MdTabsModule, MdChipsModule, MdToolbarModule, MdIconModule,
    MdProgressSpinnerModule, MdProgressBarModule, MdTooltipModule
  ],
  entryComponents: [
    AddRepoDialog,
    ShareDialog,
    AddCloudProviderDialog,
    AddConfigurationDialog,
    AddDeploymentParametersDialog,
    AddTeamDialog
  ],
  providers: [
    { provide: ConfigService, useFactory: provideConfig },
    TokenService,
    AuthService,
    CredentialService,
    ErrorService,
    AccountService,
    ApplicationService,
    DeploymentService,
    VolumeInstanceService,
    VolumeSetupService,
    ConfigurationService,
    TeamService,
    CloudProviderParametersService,
    BreadcrumbService,
    JwtHelper ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
