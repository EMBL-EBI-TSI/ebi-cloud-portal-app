import { Component, Input } from '@angular/core';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'error',
  styles: [ require('./error.style.css') ],
  template: require('./error.template.html')
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
