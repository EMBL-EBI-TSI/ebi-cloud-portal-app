import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { Welcome } from './pages/welcome';
import { Profile } from './pages/profile';
import { Repository } from './pages/repository';
import { Volumes } from './pages/volumes';
import { Deployments } from './pages/deployments';
import { About } from './pages/about';
import { Error } from './pages/error';
import { Login } from './pages/login';

export const routes: RouterConfig = [
    { path: '', component: Welcome },
    { path: 'profile', component: Profile },
    { path: 'repository', component: Repository },
    { path: 'volumes', component: Volumes },
    { path: 'deployments', component: Deployments },
    { path: 'error', component: Error },
    { path: 'about', component: About },
    { path: 'login', component: Login },
    { path: '**', component: Welcome },
];