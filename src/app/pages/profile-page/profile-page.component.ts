import { Component } from '@angular/core';
import { ProfileComponent } from 'ng2-cloud-portal-presentation-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'profile-page',
  directives: [ ProfileComponent ],
  styles: [require('./profile-page.style.css')],
  template: require('./profile-page.template.html')
})
export class ProfilePage {
  userUrl = 'assets/img/a_user.ico';

  constructor(public breadcrumbService: BreadcrumbService) {
    
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push(
      {label: 'Profile', route: 'profile'}
    );
  }

  ngOnDestroy() {
    this.breadcrumbService.breadcrumb = [];
  }
  
}
