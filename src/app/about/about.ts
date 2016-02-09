import {Component} from 'angular2/core';


@Component({
  selector: 'about',
  styles: [ require('./about.css') ],
  template: require('./about.html')
})
export class About {
  constructor() {

  }

  ngOnInit() {
    console.log('hello *About* component');
  }

}
