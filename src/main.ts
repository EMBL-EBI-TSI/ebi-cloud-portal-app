/*
 * Providers provided by Angular
 */
import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { FORM_PROVIDERS } from 'angular2/common';
import { ConfigService } from './app/services/config/config.service';

const ENV_PROVIDERS = [];

let activeConfig: ConfigService;

if ('production' === process.env.ENV) {
  enableProdMode();
  activeConfig = new ConfigService('https://dev.tsi.ebi.ac.uk:8143/');
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
  activeConfig = new ConfigService('http://localhost:8080/');
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(App, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...FORM_PROVIDERS,
    provide(ConfigService, { useValue: activeConfig }),
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
  .catch(err => console.error(err));

});

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
