import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { WelcomePage } from './pages/welcome-page';
import { ProfilePage } from './pages/profile-page';
import { RepositoryPage } from './pages/repository-page';
import { ApplicationPage } from './pages/application-page';
import { VolumesPage } from './pages/volumes-page';
import { DeploymentsPage } from './pages/deployments-page';
import { DeploymentPage } from './pages/deployment-page';
import { AboutPage } from './pages/about-page';
import { ErrorPage } from './pages/error-page';
import { LoginPage } from './pages/login-page';

export const routes: RouterConfig = [
    { path: '', component: WelcomePage },
    { path: 'profile', component: ProfilePage },
    { path: 'repository', component: RepositoryPage },
    { path: 'repository/:id', component: ApplicationPage },
    { path: 'deployments/:id', component: DeploymentPage },
    { path: 'deployments', component: DeploymentsPage },
    { path: 'volumes', component: VolumesPage },
    { path: 'error', component: ErrorPage },
    { path: 'about', component: AboutPage },
    { path: 'login', component: LoginPage },
    { path: '**', component: WelcomePage },
];