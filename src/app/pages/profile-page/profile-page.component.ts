import { Component } from '@angular/core';
import { ProfileComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'profile-page',
  directives: [ ProfileComponent ],
  styles: [require('./profile-page.style.css')],
  template: require('./profile-page.template.html')
})
export class ProfilePage {

}
