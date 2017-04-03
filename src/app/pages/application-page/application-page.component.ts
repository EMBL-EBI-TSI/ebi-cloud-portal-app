import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { Component } from '@angular/core';
import { ApplicationComponent, MapToIterablePipe } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'application-page',
  directives: [ ApplicationComponent ],
  pipes: [ MapToIterablePipe ],
  styles: [require('./application-page.style.css')],
  template: require('./application-page.template.html')
})
export class ApplicationPage {

  constructor(public breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute) {
    
  }

  ngOnInit() {
    let appName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push( {label:'Repository', route:'repository'} );
    this.breadcrumbService.breadcrumb.push( {label:appName, route:'repository/'+appName} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }
}
