import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'volumes-page',
  templateUrl: './volumes-page.component.html',
  styleUrls: ['./volumes-page.component.css']
})
export class VolumesPageComponent implements OnInit {

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
