import { Component, Input } from 'angular2/core';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'error',
  styles: [ require('./error.component.css') ],
  template: require('./error.component.html')
})
export class Error {

	error: ErrorService;

  constructor(public errorService: ErrorService) {
		this.error = errorService;
  }

  ngOnInit() {
    console.log('hello *Error* component');
  }

}
