import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})
export class ApplicationPageComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService, private _route: ActivatedRoute) {
    
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
