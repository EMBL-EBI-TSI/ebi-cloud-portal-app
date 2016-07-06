import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { Home } from './pages/home';
import { About } from './pages/about';
import { Profile } from './pages/profile';
import { NoContent } from './pages/no-content';


export const routes: RouterConfig = [
    { path: '', component: Home },
    { path: 'profile', component: Profile },
    { path: 'home', component: Home },
    // make sure you match the component type string to the require in asyncRoutes
    { path: 'about', component: 'About' },
    { path: '**', component: Home },
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

export const asyncRoutes: AsyncRoutes = {
    // we have to use the alternative syntax for es6-promise-loader to grab the routes
    'About': require('es6-promise-loader!./pages/about'),
    'Detail': require('es6-promise-loader!./pages/+detail'),
    'Index': require('es6-promise-loader!./pages/+detail'), // must be exported with detail/index.ts
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
    asyncRoutes['About'],
    asyncRoutes['Detail'],
    // es6-promise-loader returns a function
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
