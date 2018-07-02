import { Component, Inject } from '@angular/core';
import { TokenService } from 'ng2-cloud-portal-service-lib';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {

  barRef: any;

  constructor(public tokenService: TokenService, public snackBar: MatSnackBar) { 
    if (!(localStorage.getItem('gdpr-accepted')=='yes')) {
      this.barRef = this.snackBar.openFromComponent(
        GdprAnnouncementComponent, {
          data: {parent: this}
      });

      this.barRef.afterDismissed().subscribe(() => {
        console.log("GDPR agreed");
        localStorage.setItem('gdpr-accepted', 'yes');
      });
    }
  }

}

@Component({
  selector: './gdpr-announcement-component',
  templateUrl: 'gdpr-announcement.component.html'
})
export class GdprAnnouncementComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }

  public agreeGdpr() {
    this.data.parent.barRef.dismiss();
  }
}