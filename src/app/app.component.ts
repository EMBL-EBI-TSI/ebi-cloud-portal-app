/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

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
    emblLogo = 'assets/img/embl-logo.png';
    name = 'TSI Cloud Portal';
    url = 'https://github.com/EMBL-EBI-TSI';

    constructor() {

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
