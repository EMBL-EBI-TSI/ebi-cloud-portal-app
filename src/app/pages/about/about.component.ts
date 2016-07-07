import { Component } from '@angular/core';

@Component({
  selector: 'about',
  styles: [require('./about.style.css')],
  template: require('./about.template.html')
})
export class About {
  constructor() {

  }

  ngOnInit() {
    console.log('hello *About* component');
  }

}
