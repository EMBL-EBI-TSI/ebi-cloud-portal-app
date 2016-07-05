// App
export * from './app.component';
export * from './services/app.service';
export * from './app.routes';

import {provide, enableProdMode} from '@angular/core';

import { AppState } from './services/app.service';
import { ConfigService } from './services/config/config.service';
import { ErrorService } from './services/error/error.service';
import { CredentialService } from './services/credential/credential.service';

const ENV_PROVIDERS = [];

let activeConfig: ConfigService;

if ('production' === process.env.ENV) {
  enableProdMode();
  activeConfig = new ConfigService('https://dev.tsi.ebi.ac.uk:8143/');
} else {
  //ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
  activeConfig = new ConfigService('http://localhost:8080/');
}

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  provide(ConfigService, { useValue: activeConfig }),
  ErrorService,
  CredentialService
];
