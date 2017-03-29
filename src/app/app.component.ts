/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { CredentialService } from 'ng2-cloud-portal-service-lib';
import { CloudProviderParametersService, CloudProviderParameters,
         ErrorService } from 'ng2-cloud-portal-service-lib';
import { AccountService, Account } from 'ng2-cloud-portal-service-lib';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { TokenService } from 'ng2-cloud-portal-service-lib';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';

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
    name = 'Cloud Portal';
    ebiUrl = 'http://www.ebi.ac.uk/';
    tsiGithubUrl = 'https://github.com/EMBL-EBI-TSI';
    currentView = "Welcome";
    loggedInAccount: Account;
    cloudProviderParameters: CloudProviderParameters[];
    sharedCloudProviderParameters: CloudProviderParameters[];
    selectedCloudProvider='SELECT PROVIDER';
    
    constructor(
        public tokenService: TokenService,
        public credentialService: CredentialService,
        public accountService: AccountService,
        public cloudProviderParametersService: CloudProviderParametersService,
        public errorService: ErrorService,
        public router: Router,
        public breadcrumbService: BreadcrumbService) {
        if (tokenService.getToken()) {
            this.accountService.getAccount(
                this.credentialService.getUsername(),
                this.tokenService.getToken()
            ).subscribe(
                (account) => {
                    this.loggedInAccount = account;
                }
            );
            this.updateCloudProviders(true);
        }
    }

    logOut() {
        this.credentialService.clearCredentials();
        this.tokenService.clearToken();
        this.router.navigateByUrl('/welcome');
    }

    ngOnInit() {
        console.log('Hello app');
    }

    getViewName() {
        return this.router.url;
    }

    public getBreadcrumb() {
        return this.breadcrumbService.breadcrumb;
    }

    public getBreadcrumbUrl() {
        return "#/"+this.breadcrumbService.getAsUrl();
    }

    public setCurrentlySelectedCloudProviderParameters(cloudProviderParameters: CloudProviderParameters) {
        console.log("Set provider to %O", cloudProviderParameters);
        this.cloudProviderParametersService.currentlySelectedCloudProviderParameters = cloudProviderParameters;
    }

    public updateCloudProviders(open:boolean):void {
        if (open) {
            this.cloudProviderParametersService.getAll(
                this.credentialService.getUsername(),
                this.tokenService.getToken())
            .subscribe(
                cloudProviderParameters => {
                    console.log('[App] cloud provider parameters data is %O', cloudProviderParameters);
                    this.cloudProviderParameters = cloudProviderParameters
                },
                error => {
                    console.log('[App] error %O', error);
                    if (error[0]) {
                        error = error[0];
                    }
                    this.errorService.setCurrentError(error);
                    this.router.navigateByUrl('/error');
                },
                () => {
                    console.log('[App] Cloud provider parameters data retrieval complete');
                }
            );

            this.cloudProviderParametersService.getAllShared(
                this.credentialService.getUsername(),
                this.tokenService.getToken())
            .subscribe(
                cloudProviderParameters => {
                    console.log('[App] shared cloud provider parameters data is %O', cloudProviderParameters);
                    this.sharedCloudProviderParameters = cloudProviderParameters
                },
                error => {
                    console.log('[App] error %O', error);
                    if (error[0]) {
                        error = error[0];
                    }
                    this.errorService.setCurrentError(error);
                    this.router.navigateByUrl('/error');
                },
                () => {
                    console.log('[App] shared Cloud provider parameters data retrieval complete');
                }
            );
        }
    }

}
