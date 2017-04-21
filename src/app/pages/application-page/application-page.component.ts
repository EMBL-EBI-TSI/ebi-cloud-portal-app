import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})
export class ApplicationPageComponent implements OnInit {

  constructor(private _route: ActivatedRoute) {
    
  }

  ngOnInit() {
    let appName = this._route.snapshot.params['id'];
  }

}
