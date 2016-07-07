import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { Profile } from './pages/profile';
import { Repository } from './pages/repository';
import { Volumes } from './pages/volumes';
import { Deployments } from './pages/deployments';
import { About } from './pages/about';
import { Error } from './pages/error';

export const routes: RouterConfig = [
    { path: '', component: Deployments },
    { path: 'profile', component: Profile },
    { path: 'repository', component: Repository },
    { path: 'volumes', component: Volumes },
    { path: 'deployments', component: Deployments },
    { path: 'error', component: Error },
    { path: 'about', component: About },
    { path: '**', component: Deployments },
];