import {Component} from 'angular2/core';


@Component({
  selector: 'about',
  styles: [require('./about.component.css')],
  template: require('./about.component.html')
})
export class About {
  constructor() {

  }

  ngOnInit() {
    console.log('hello *About* component');
  }

}
