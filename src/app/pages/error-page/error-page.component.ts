import { Component } from '@angular/core';
import { ErrorComponent } from 'ng2-cloud-portal-presentation-lib';
import { ErrorService } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'error-page',
  directives: [ ErrorComponent ],
  styles: [ require('./error-page.style.css') ],
  template: require('./error-page.template.html')
})
export class ErrorPage {
  robby = 'assets/img/Robby error@0.5x.png';

  constructor(public breadcrumbService: BreadcrumbService) {
    
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push( {label:'Error', route:'error'} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

}
