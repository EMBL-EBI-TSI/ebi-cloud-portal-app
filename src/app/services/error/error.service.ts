import { Injectable } from 'angular2/core';

@Injectable()
export class ErrorService {
  
  message: string;

  constructor() {
		// this.message = 'No error';
		console.log('[ErrorService] constructor called');
  }

  setMessage(message: string) {
		console.log('[ErrorService] Setting message to ' + message);
		this.message = message;
		console.log('[ErrorService] Message set to ' + this.message);
  }

	getMessage() {
		console.log('[ErrorService] getting message that is ' + this.message);
		return this.message;
  }

}
