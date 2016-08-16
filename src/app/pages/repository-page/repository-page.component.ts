import { Component } from '@angular/core';
import { RepositoryComponent } from 'ng2-cloud-portal-presentation-lib';


@Component({
  selector: 'repository-page',
  directives: [ RepositoryComponent ],
  styles: [require('./repository-page.style.css')],
  template: require('./repository-page.template.html')
})
export class RepositoryPage {

}
