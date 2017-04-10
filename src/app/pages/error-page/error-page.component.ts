import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  robby = 'assets/img/Robby_error0.5x.png';

  constructor() { }

  ngOnInit() {
  }

}
