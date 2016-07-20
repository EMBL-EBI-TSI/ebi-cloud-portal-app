import { Component } from '@angular/core';
import { VolumesComponent } from 'ng2-cloud-portal-presentation-lib';

@Component({
  selector: 'volumes-page',
  directives: [ VolumesComponent ],
  styles: [require('./volumes-page.style.css')],
  template: require('./volumes-page.template.html')
})
export class VolumesPage {

}
