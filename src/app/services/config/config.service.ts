import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  apiAddress: string;

  constructor(apiAddress: string) {
    this.apiAddress = apiAddress;
  }

  getApiAddress() {
    return this.apiAddress;
  }

}
