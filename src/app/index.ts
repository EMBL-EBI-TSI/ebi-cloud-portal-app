// App
export * from './app.component';
export * from './app.routes';

import {provide, enableProdMode} from '@angular/core';

import { ConfigService } from 'ng2-cloud-portal-service-lib';
import { ErrorService } from 'ng2-cloud-portal-service-lib';
import { CredentialService } from 'ng2-cloud-portal-service-lib';
import { TokenService } from 'ng2-cloud-portal-service-lib';

const ENV_PROVIDERS = [];

let activeConfig: ConfigService;

if ('production' === process.env.ENV) {
  enableProdMode();
  activeConfig = new ConfigService('https://dev.api.portal.tsi.ebi.ac.uk/', 'https://dev.tsi.ebi.ac.uk:8443/');
} else {
  //ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
  activeConfig = new ConfigService('http://localhost:8080/');
}

// Application wide providers
export const APP_PROVIDERS = [
  provide(ConfigService, { useValue: activeConfig }),
  ErrorService,
  CredentialService,
  TokenService
];
