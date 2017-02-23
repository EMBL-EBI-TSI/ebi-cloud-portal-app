import { Component } from '@angular/core';
import { TeamComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'team-page',
  directives: [ TeamComponent ],
  styles: [require('./team-page.style.css')],
  template: require('./team-page.template.html')
})
export class TeamPage {

}
