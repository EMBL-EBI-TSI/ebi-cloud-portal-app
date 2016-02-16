import {Component} from 'angular2/core';
import {NgForm, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Router} from 'angular2/router';

import { ApplicationService } from '../services/application/application.service';
import { CredentialService } from '../services/credential/credential.service';


@Component({
		selector: 'application-form',
		providers: [ ApplicationService, CredentialService ],
		template: require('./application-form.component.html')
})
export class ApplicationForm {

		applicationForm: ControlGroup;

		constructor(
			fb: FormBuilder,
			public router: Router,
			public applicationService: ApplicationService,
			public credentialService: CredentialService) {

			this.applicationForm = fb.group({
				repoUri: ["", Validators.required]
			});

		}

		addApplication(event) {
			event.preventDefault();
			console.log("[ApplicationForm] adding " + this.applicationForm.value.repoUri);
			this.applicationService.add(this.credentialService, this.applicationForm.value.repoUri).subscribe(
				application  => {

				},
				error => {
					console.log(error);
				}
			);
		}

}