import {Injectable} from 'angular2/core';

@Injectable()
export class ConfigService {


	apiAddress: string;

  constructor(apiAddress: string) {
		this.apiAddress = apiAddress;
		console.log('[ConfigService] constructor called');
  }

  getApiAddress() {
		console.log('[ConfigService] getting IP address');
		return this.apiAddress;
  }


}
