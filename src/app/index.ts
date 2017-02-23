// App
export * from './app.component';
export * from './app.routes';

import {provide, enableProdMode} from '@angular/core';

import { ApplicationService, AccountService, CredentialService, ErrorService, ConfigService,
  VolumeInstanceService, DeploymentService, TokenService,
  CloudProviderParametersService, TeamService, ConfigurationService } from 'ng2-cloud-portal-service-lib';


const ENV_PROVIDERS = [];

let activeConfig: ConfigService;

if ('production' === process.env.ENV) {
  enableProdMode();
  activeConfig = new ConfigService('https://dev.api.portal.tsi.ebi.ac.uk/', 'https://api.aap.tsi.ebi.ac.uk/');
} else {
  //ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
  activeConfig = new ConfigService('http://localhost:8080/', 'https://api.aap.tsi.ebi.ac.uk/');
}

// Application wide providers
export const APP_PROVIDERS = [
  provide(ConfigService, { useValue: activeConfig }),
  ErrorService,
  CredentialService,
  TokenService,
  ApplicationService,
  AccountService,
  VolumeInstanceService,
  DeploymentService,
  CloudProviderParametersService,
  TeamService,
  ConfigurationService
];
