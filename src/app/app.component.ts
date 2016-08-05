/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { CredentialService } from 'ng2-cloud-portal-service-lib';
import { Router } from '@angular/router';
import { TokenService } from 'ng2-cloud-portal-service-lib';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.style.css'
    ],
    template: require('./app.template.html')
})
export class App {
    ebiLogoBlack = 'assets/img/EMBL_EBI_Logo_black.png';
    ebiLogoWhite = 'assets/img/EMBL_EBI_Logo_white.png';
    name = 'TSI Cloud Portal';
    ebiUrl = 'http://www.ebi.ac.uk/';
    tsiGithubUrl = 'https://github.com/EMBL-EBI-TSI';

    constructor(
        public tokenService: TokenService,
        public credentialService: CredentialService,
        public router: Router) {

    }

    logOut() {
        this.credentialService.clearCredentials();
        this.tokenService.clearToken();
        this.router.navigateByUrl('/welcome');
    }

    ngOnInit() {
        console.log('Hello app');
    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
