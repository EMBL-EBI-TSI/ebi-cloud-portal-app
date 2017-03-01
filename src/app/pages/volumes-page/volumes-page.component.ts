import { Component } from '@angular/core';
import { VolumesComponent } from 'ng2-cloud-portal-presentation-lib';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'volumes-page',
  directives: [ VolumesComponent ],
  styles: [require('./volumes-page.style.css')],
  template: require('./volumes-page.template.html')
})
export class VolumesPage {

  constructor(public breadcrumbService: BreadcrumbService) {  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push(
      {label: 'Volumes', route: 'volumes'}
    );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

}
