import { Component } from '@angular/core';

import { ApplicationComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'application-page',
  directives: [ ApplicationComponent ],
  styles: [require('./application-page.style.css')],
  template: require('./application-page.template.html')
})
export class ApplicationPage {

}
