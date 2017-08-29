import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService,
    private _route: ActivatedRoute) {
    
  }

  ngOnInit() {
    let teamName = this._route.snapshot.params['id'];
    this.breadcrumbService.breadcrumb.push( {label:'Teams', route:'teams'} );
    this.breadcrumbService.breadcrumb.push( {label:teamName, route:'teams/'+teamName} );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }
}
