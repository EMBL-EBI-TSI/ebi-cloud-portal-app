import { Component } from '@angular/core';
import { TeamComponent } from 'ng2-cloud-portal-presentation-lib';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'team-page',
  directives: [ TeamComponent ],
  styles: [require('./team-page.style.css')],
  template: require('./team-page.template.html')
})
export class TeamPage {

  constructor(public breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute) {
    
  }

  ngOnInit() {
    let teamName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push( {label:'Profile', route:'profile'} );
    this.breadcrumbService.breadcrumb.push( {label:teamName, route:'teams/'+teamName} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }

}
