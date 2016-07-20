import { Component } from '@angular/core';
import { ErrorComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'error-page',
  directives: [ ErrorComponent ],
  styles: [ require('./error-page.style.css') ],
  template: require('./error-page.template.html')
})
export class ErrorPage {

}
