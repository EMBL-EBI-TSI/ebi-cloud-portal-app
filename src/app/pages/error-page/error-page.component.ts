import { Component } from '@angular/core';
import { ErrorComponent } from 'ng2-cloud-portal-presentation-lib';
import { ErrorService } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'error-page',
  directives: [ ErrorComponent ],
  styles: [ require('./error-page.style.css') ],
  template: require('./error-page.template.html')
})
export class ErrorPage {
  robby = 'assets/img/Robby error@0.5x.png';
}
