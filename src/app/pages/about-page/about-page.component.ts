import { Component } from '@angular/core';

@Component({
  selector: 'about-page',
  styles: [require('./about-page.style.css')],
  template: require('./about-page.template.html')
})
export class AboutPage {
  constructor() {

  }

  ngOnInit() {
    console.log('[AboutPage] hello *AboutPage* component');
  }

}
