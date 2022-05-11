import { Component, OnInit, Renderer, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  CredentialService, TokenService,
  AuthService, JwtToken, Account, TeamService, ApplicationService
} from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ErrorService, Error } from 'ng2-cloud-portal-service-lib';

@Component({
  selector: 'signon-page',
  templateUrl: './signon-page.component.html',
  styleUrls: ['./signon-page.component.css']
})
export class SignonPageComponent implements OnInit, OnDestroy {

  robby = 'assets/img/Robby_form0.5x.png';
  account: Account;
  removeMessageListener: Function;
  lsLoginLogo = 'assets/img/login-grey-wide.jpg.png';
  emblLogo = 'assets/img/embl_logo_only.png';

  constructor(
    private router: Router,
    public authService: AuthService,
    public credentialService: CredentialService,
    public tokenService: TokenService,
    public errorService: ErrorService,
    public breadcrumbService: BreadcrumbService,
    renderer: Renderer,
    public teamService: TeamService,
    public applicationService: ApplicationService
  ) {

    // We cache the function "listenGlobal" returns, as it's one that allows to cleanly unregister the event listener
    this.removeMessageListener = renderer.listenGlobal('window', 'message', (event: MessageEvent) => {
      if (!this.authService.canAcceptMessage(event)) {
        console.log("received unacceptable message! Ignoring...", event);
        return;
      }
      this.authService.processToken(event.data);
      event.source.close();
      if (tokenService.getToken()) {
        this.teamService.addToDefaultTeam(credentialService.getUsername(),
          tokenService.getToken()).subscribe(
          () => { console.log('Added user to default team'); },
          error => { console.log('Error in adding user to default team'); }
        );
        this.router.navigateByUrl('/');
      }
    });
   }

  ssoLink() {
    return this.authService.ssoLink();
  }

  emblSsoLink() {
    return this.authService.emblSsoLink();
  }

  emblExplanation() {
    return "This has been temporarily disabled on 28 Feb while we investigate an integration issue. Please contact us at sdo@ebi.ac.uk if you have any questions.";
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumb.push( {label:'Login', route:'login'} );
  }

  ngOnDestroy() {
    this.removeMessageListener();
    this.breadcrumbService.breadcrumb = [];
  }
}
