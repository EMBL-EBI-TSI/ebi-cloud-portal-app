import { Injectable } from 'angular2/core';

@Injectable()
export class ErrorService {

  message: string;

  constructor() {
  }

  setMessage(message: string) {
		this.message = message;
  }

	getMessage() {
		return this.message;
  }

}
